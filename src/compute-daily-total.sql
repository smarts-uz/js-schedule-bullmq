CREATE DEFINER=`root`@`localhost` PROCEDURE `compute_daily_total`()
BEGIN
  -- Insert random sales values for demonstration
  INSERT INTO sales (sale_date, amount) 
  VALUES 
    (CURDATE(), ROUND(RAND() * 1000, 2));
END