DROP TABLE IF EXISTS userdata CASCADE;
DROP TABLE IF EXISTS userProfile CASCADE;
DROP TABLE IF EXISTS history CASCADE;

CREATE TABLE userdata (
    username VARCHAR(32) NOT NULL,
    pass VARCHAR(150) NOT NULL,
    PRIMARY KEY(username)
);

CREATE TABLE userProfile (
    username VARCHAR(32) NOT NULL,
    fullname VARCHAR(100) NOT NULL,
    address1 VARCHAR(100) NOT NULL,
    address2 VARCHAR(50) ,
    city VARCHAR(20) NOT NULL,
    state VARCHAR(20) NOT NULL,
    zipcode VARCHAR(9) NOT NULL,
    CONSTRAINT "userProfile_username_fkey" FOREIGN KEY (username) REFERENCES userdata(username)
);

CREATE TABLE history (
    username VARCHAR(32) NOT NULL,
    date VARCHAR(10) NOT NULL,
    gallons numeric(10,2) NOT NULL,
    suggested_price numeric(10,2) NOT NULL,
    total_price numeric(10,2) NOT NULL,
    address VARCHAR(200) NOT NULL,
    CONSTRAINT "history_username_fkey" FOREIGN KEY (username) REFERENCES userdata(username)
);


INSERT INTO userdata VALUES('admin', 'admin');

INSERT INTO history VALUES('admin', '2022-05-11', '25.00', '7.14', '2985.20', '5400 main st. , Houston, TX, 77001');
INSERT INTO history VALUES('admin', '2022-05-11', '15.00', '4.74', '5985.20', '5400 main st. , Houston, TX, 77001');
INSERT INTO history VALUES('admin', '2022-05-11', '45.00', '5.54', '7185.20', '5400 main st. , Houston, TX, 77001');
INSERT INTO history VALUES('admin', '2022-05-11', '855.00', '8.14', '15985.20', '5400 main st. , Houston, TX, 77001');
INSERT INTO history VALUES('admin', '2022-05-11', '27.00', '5.75', '5185.20', '5400 main st. , Houston, TX, 77001');
INSERT INTO history VALUES('admin', '2022-05-11', '254.00', '5.88', '1985.20', '5400 main st. , Houston, TX, 77001');
INSERT INTO history VALUES('admin', '2022-05-11', '252.00', '5.20', '2985.20', '5400 main st. , Houston, TX, 77001');
INSERT INTO history VALUES('admin', '2022-05-11', '210.00', '5.41', '1985.20', '5400 main st. , Houston, TX, 77001');
INSERT INTO history VALUES('admin', '2022-05-11', '20.00', '5.30', '985.20', '5400 main st. , Houston, TX, 77001');
INSERT INTO history VALUES('admin', '2022-05-11', '25.00', '5.52', '985.20', '5400 main st. , Houston, TX, 77001');
INSERT INTO history VALUES('admin', '2022-05-11', '25.00', '5.14', '985.20', '5400 main st. , Houston, TX, 77001');



INSERT INTO userProfile VALUES('admin', 'mr.bean', '5400 main st.', null, 'Houston', 'TX', '77001')