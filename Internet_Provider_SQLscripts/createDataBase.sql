create table Client
(
Client_Id int primary key auto_increment, 
Client_FirstName varchar(255) not null,
Client_LastName varchar(255) not null,
Client_Passport varchar(255) not null unique,
Client_Birthday date not null
);

create table Mounter
(
Mounter_Id int primary key auto_increment, 
Mounter_FirstName varchar(255) not null,
Mounter_LastName varchar(255) not null,
Mounter_Passport varchar(255) not null unique,
Mounter_Birthday date not null,
Mounter_EmploymentDate date not null
);

create table Service
(
Service_Id int primary key auto_increment,
Service_Name varchar(255) not null unique,
Service_Price float not null
); 

create table Equipment
(
Equipment_Id int primary key auto_increment,
Equipment_Name varchar(255) not null unique,
Equipment_Price float not null,
Equipment_Count int not null
); 

create table ServiceOrder
(
Order_Id int primary key auto_increment,
Order_Date date not null,
Order_Price float not null,
Order_ClientId int not null,
Order_MounterId int not null,

constraint FK_OrderToClient foreign key(Order_ClientId) references Client(Client_Id),
constraint FK_OrderToMounter foreign key(Order_MounterId) references Mounter(Mounter_Id)
); 

create table ServicesInOrders
(
Order_Id int not null,
Service_Id int not null,

constraint FK_Order_Order_Id___ServicesInOrders_Order_Id foreign key(Order_Id) references ServiceOrder(Order_Id),
constraint FK_Service_Service_Id___ServicesInOrders_Service_Id foreign key(Service_Id) references Service(Service_Id)
);
create table EquipmentInOrders
(
Order_Id int not null,
Equipment_Id int not null,
Equipment_Count int not null,

constraint FK_Order_Order_Id___EquipmentInOrders_Order_Id foreign key(Order_Id) references ServiceOrder(Order_Id),
constraint FK_Equipment_Equipment_Id___EquipmentInOrders_Equipment_Id foreign key(Equipment_Id) references Equipment(Equipment_Id)
);

create table Tariff
(
Tariff_Id int primary key auto_increment,
Tariff_Name varchar(255) not null unique,
Tariff_MaxSpeed int not null,
Tariff_Price float not null
);

create table Contract
(
Contract_Id int primary key auto_increment,
Contract_ClientId int not null,
Contract_ConclusionDate date not null,
Contract_TerminationDate date,
Contract_TariffId int not null,

constraint FK_ContractToClient foreign key(Contract_ClientId) references Client(Client_Id),
constraint FK_ContractToTariff foreign key(Contract_TariffId) references Tariff(Tariff_Id)
);

create table Users
(
User_Id int primary key auto_increment,
User_Login varchar(255) not null unique,
User_Password varchar(255) not null,
User_ClientId int,

constraint FK_UserToClient foreign key(User_ClientId) references Client(Client_Id)
);