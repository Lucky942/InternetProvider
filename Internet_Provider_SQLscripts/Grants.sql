

CREATE USER 'Mounter'@'localhost' IDENTIFIED WITH mysql_native_password BY '123';
GRANT SELECT ON InternetProvider.Client to 'Mounter'@'localhost';
GRANT SELECT ON InternetProvider.Contract to 'Mounter'@'localhost';
GRANT SELECT ON InternetProvider.Equipment to 'Mounter'@'localhost';
GRANT SELECT ON InternetProvider.EquipmentInOrders to 'Mounter'@'localhost';
GRANT SELECT ON InternetProvider.Mounter to 'Mounter'@'localhost';
GRANT SELECT ON InternetProvider.Service to 'Mounter'@'localhost';
GRANT SELECT ON InternetProvider.ServiceOrder to 'Mounter'@'localhost';
GRANT SELECT ON InternetProvider.ServicesInOrders to 'Mounter'@'localhost';
GRANT SELECT ON InternetProvider.Tariff to 'Mounter'@'localhost';

FLUSH PRIVILEGES;