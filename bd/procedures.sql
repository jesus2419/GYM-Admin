DELIMITER $$

CREATE PROCEDURE register_full_subscription (
    IN p_user_id INT,
    IN p_plan_id INT,
    IN p_amount_paid DECIMAL(10,2)
)
BEGIN
    DECLARE v_duration_days INT;
    DECLARE v_start_date DATE;
    DECLARE v_end_date DATE;
    DECLARE v_subscription_id INT;
    DECLARE v_payment_id INT;
    DECLARE v_exists INT DEFAULT 0;

    -- Verificar si ya hay una suscripción activa al mismo plan
    SELECT COUNT(*) INTO v_exists
    FROM user_subscriptions
    WHERE user_id = p_user_id
      AND plan_id = p_plan_id
      AND status = 'active';

    IF v_exists > 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El usuario ya tiene una suscripción activa para este plan.';
    ELSE
        -- Obtener duración del plan
        SELECT duration_days INTO v_duration_days
        FROM plans
        WHERE id = p_plan_id;

        SET v_start_date = CURDATE();
        SET v_end_date = DATE_ADD(v_start_date, INTERVAL v_duration_days DAY);

        -- Insertar la suscripción
        INSERT INTO user_subscriptions (user_id, plan_id, payment_option_id, start_date, end_date, status)
        VALUES (p_user_id, p_plan_id, 0, v_start_date, v_end_date, 'active');

        SET v_subscription_id = LAST_INSERT_ID();

        -- Insertar el pago programado
        INSERT INTO scheduled_payments (user_subscription_id, due_date, amount, status, payment_date)
        VALUES (v_subscription_id, v_start_date, p_amount_paid, 'paid', v_start_date);

        SET v_payment_id = LAST_INSERT_ID();

        -- Insertar en el historial de pagos
        INSERT INTO payment_history (scheduled_payment_id, user_id, amount, payment_method, transaction_reference, notes)
        VALUES (v_payment_id, p_user_id, p_amount_paid, 'Efectivo', NULL, 'Pago completo al iniciar');
    END IF;

END$$

DELIMITER ;





DELIMITER $$

CREATE PROCEDURE check_remaining_days (
    IN p_user_id INT
)
BEGIN
    DECLARE v_end_date DATE;
    DECLARE v_days_left INT;
    DECLARE v_status VARCHAR(20);

    -- Obtener la última suscripción activa del usuario
    SELECT end_date INTO v_end_date
    FROM user_subscriptions
    WHERE user_id = p_user_id AND status = 'active'
    ORDER BY end_date DESC
    LIMIT 1;

    IF v_end_date IS NOT NULL THEN
        SET v_days_left = DATEDIFF(v_end_date, CURDATE());

        IF v_days_left >= 0 THEN
            SET v_status = 'activa';
        ELSE
            SET v_status = 'vencida';
        END IF;

        SELECT
            GREATEST(v_days_left, 0) AS remaining_days,
            v_end_date AS subscription_ends_on,
            v_status AS subscription_status;
    ELSE
        SELECT 0 AS remaining_days, NULL AS subscription_ends_on, 'sin suscripción' AS subscription_status;
    END IF;
END$$

DELIMITER ;
