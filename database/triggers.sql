USE healthcare_db;

DELIMITER $$

CREATE TRIGGER trg_before_insert_appointment
BEFORE INSERT ON APPOINTMENT
FOR EACH ROW
BEGIN
    -- Default status
    IF NEW.status IS NULL OR NEW.status = '' THEN
        SET NEW.status = 'booked';
    END IF;

    -- Prevent past date
    IF NEW.appointment_date < CURDATE() THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Appointment date cannot be in the past';
    END IF;

    -- Prevent double booking
    IF EXISTS (
        SELECT 1 FROM APPOINTMENT
        WHERE doctor_id = NEW.doctor_id
        AND appointment_date = NEW.appointment_date
        AND appointment_time = NEW.appointment_time
    ) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Doctor already has an appointment at this time';
    END IF;
END $$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER trg_before_update_appointment
BEFORE UPDATE ON APPOINTMENT
FOR EACH ROW
BEGIN
    -- Validate status
    IF NEW.status NOT IN ('booked', 'completed', 'cancelled') THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid appointment status';
    END IF;

    -- Prevent modifying completed appointments wrongly
    IF OLD.status = 'completed' AND NEW.status = 'cancelled' THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Completed appointment cannot be cancelled';
    END IF;
END $$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER trg_after_delete_appointment
AFTER DELETE ON APPOINTMENT
FOR EACH ROW
BEGIN
    INSERT INTO APPOINTMENT_LOG (
        appointment_id,
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status
    )
    VALUES (
        OLD.appointment_id,
        OLD.patient_id,
        OLD.doctor_id,
        OLD.appointment_date,
        OLD.appointment_time,
        OLD.status
    );
END $$

DELIMITER ;


DELIMITER $$

CREATE TRIGGER trg_lab_report_auto_status
BEFORE UPDATE ON LAB_REPORT
FOR EACH ROW
BEGIN
    IF NEW.result IS NOT NULL AND NEW.result <> '' THEN
        SET NEW.status = 'completed';
    END IF;
END $$

DELIMITER ;
