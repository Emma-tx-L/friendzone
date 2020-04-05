 DROP TABLE IF EXISTS Account, Activity, Address, Admin, AdminType, Availability, Chat, ChatComment, Event, Interests, 
 Profile, Region, Registered, RegularUser, Review, ReviewedBy CASCADE;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Account(
    Email VARCHAR(100),
    Password VARCHAR(100),
    PRIMARY KEY(Email));

INSERT INTO Account
VALUES
    ('john@gmail.com', '123456'),
    ('ayman@gmail.com', '123456'),
    ('terry@gmail.com', '123456'),
    ('emma@gmail.com', '123456'),
    ('hazra@gmail.com', '123456');

CREATE TABLE Profile(
	ID uuid DEFAULT uuid_generate_v4 (),
	Email VARCHAR(100),
	DOB DATE, 
	FirstName VARCHAR(100) NOT NULL,
	LastName VARCHAR(100) NOT NULL,
	PRIMARY KEY(ID),
	FOREIGN KEY(Email) REFERENCES Account ON DELETE CASCADE);

INSERT INTO Profile
VALUES
    ('1fd87df8-7106-43b1-866c-dc8673565ae2', 'john@gmail.com', '1992-10-20', 'John', 'Aguilar'),
    ('69b734c1-d441-45ea-82fc-fae17c129294','ayman@gmail.com', '1995-02-03', 'Ayman', 'Azhar'),
    ('d31c296d-6e8d-4eb1-9fa8-1a65a8d7cbb8', 'terry@gmail.com', '1997-03-12', 'Terry', 'Zhang'),
    ('5478fb4e-2d75-4079-9ffd-7b5650e366cc', 'emma@gmail.com', '1994-12-10', 'Emma', 'Liu'),
    ('79b83a7e-2e29-4c1e-a2fe-b9c5ac4f18da', 'hazra@gmail.com', '1990-12-10', 'Hazra', 'Imran');


CREATE TABLE Availability (
	ProfileID uuid DEFAULT uuid_generate_v4 (),
	StartDate DATE,
	EndDate DATE,
	Public BOOLEAN DEFAULT true,
	PRIMARY KEY(ProfileID, StartDate, EndDate),
	FOREIGN KEY(ProfileID) REFERENCES Profile(ID) ON DELETE CASCADE);

INSERT INTO Availability
VALUES
    ('1fd87df8-7106-43b1-866c-dc8673565ae2', '2020-03-03', '2020-03-14', true),
    ('69b734c1-d441-45ea-82fc-fae17c129294', '2020-03-02', '2020-03-24', false),
    ('d31c296d-6e8d-4eb1-9fa8-1a65a8d7cbb8', '2020-04-03', '2020-05-13', true),
    ('5478fb4e-2d75-4079-9ffd-7b5650e366cc', '2020-04-05', '2020-04-28', true),
    ('79b83a7e-2e29-4c1e-a2fe-b9c5ac4f18da', '2020-03-01', '2020-03-24', false);


CREATE TABLE Region(
    PostalCode VARCHAR(7) PRIMARY KEY,
    Province VARCHAR(30),
    City VARCHAR(30));

INSERT INTO Region
VALUES
    ('V6K 1X6', 'Vancouver', 'BC'),
    ('V3W 3G5', 'Toronto', 'ON'),
    ('V3S 4P5', 'Surrey', 'BC'),
    ('V5K 6D3', 'Richmond', 'BC'),
    ('V7V 8KD', 'Vancouver', 'BC'),
    ('V6K 1J8', 'Narnia', 'BC');


CREATE TABLE Address(
	StreetNumber INTEGER,
	StreetName VARCHAR(30),
	PostalCode VARCHAR(7),
	PRIMARY KEY(PostalCode, StreetNumber, StreetName),
	FOREIGN KEY (PostalCode) REFERENCES Region(PostalCode) ON DELETE CASCADE);

INSERT INTO Address
VALUES 
    (3135, 'West 4th Ave', 'V6K 1X6'),
    (18702, 'Yonge Street', 'V3W 3G5'),
    (3425, '148 Street', 'V3S 4P5'),
    (10724, 'Bird Road', 'V5K 6D3'),
    (3194, 'Main Street', 'V7V 8KD'),
    (9999, 'Rainbow Road', 'V6K 1J8');

CREATE TABLE Chat(
	ID uuid DEFAULT uuid_generate_v4 (),
	Name VARCHAR(30) DEFAULT 'Chat',
	PRIMARY KEY(ID));

INSERT INTO Chat
VALUES
    ('bffea326-be23-46a4-bbbb-296cb9a9bc18', 'Stoked for the Strokes'),
    ('31bc50df-d15b-444d-b360-c1c313b43103', 'Painting Pals'),
    ('90cb8ff1-b30a-495a-afde-f1e2baf08e1a', 'The Grind'),
    ('fa5d90dc-bed3-47f3-8ce8-430100d39908', 'Pie Crawl'),
    ('aa3432af-1257-46f7-aa0a-89ebb42b17db', 'Machine Learning and JS Event'),
    ('04e20861-1e48-41c2-b328-d4ff9975e94d', 'Bubble Tea Sampling'),
    ('58b6408c-8831-4605-8ecf-b3ef65ecef22', 'Migoreng Eating Contest'),
    ('ec2e8923-84de-4dc0-ad7f-c5162aa3231b', 'Sushi Lessons');

CREATE TABLE ChatComment(
	Time timestamp without time zone, 
	Content VARCHAR(50),
    ChatID uuid,
	ProfileID uuid DEFAULT uuid_generate_v4 (),
	PRIMARY KEY(Time, ChatID, ProfileID),
	FOREIGN KEY(ChatID) REFERENCES Chat(ID) ON DELETE CASCADE,
	FOREIGN KEY(ProfileID) REFERENCES Profile(ID) ON DELETE SET DEFAULT);

INSERT INTO ChatComment 
VALUES
    ('2020-03-02 03:23:00 PM', 'What time are we meeting?', 'bffea326-be23-46a4-bbbb-296cb9a9bc18', '69b734c1-d441-45ea-82fc-fae17c129294'),
    ('2020-04-10 05:53:00 PM', 'Almost there!!', 'fa5d90dc-bed3-47f3-8ce8-430100d39908', '1fd87df8-7106-43b1-866c-dc8673565ae2'),
    ('2020-04-10 05:53:00 PM', 'Cool, we’re all waiting outside the pie shop.', 'fa5d90dc-bed3-47f3-8ce8-430100d39908', '69b734c1-d441-45ea-82fc-fae17c129294'),
    ('2020-03-05 03:33:00 PM', 'Anyone know who’s opening?', 'bffea326-be23-46a4-bbbb-296cb9a9bc18', '79b83a7e-2e29-4c1e-a2fe-b9c5ac4f18da'),
    ('20200307 07:34:00 PM', 'Are we using acrylic or oil paints?', '31bc50df-d15b-444d-b360-c1c313b43103', 'd31c296d-6e8d-4eb1-9fa8-1a65a8d7cbb8');

CREATE TABLE Activity(
	Type VARCHAR(100),
	Level VARCHAR(100),
	PRIMARY KEY(Type, Level));

INSERT INTO Activity
VALUES
    ('Fitness', 'Beginner'),
	('Fitness', 'Intermediate'),
    ('Fitness', 'Advanced'),
    ('Technology', 'Beginner'),
    ('Technology', 'Intermediate'),
    ('Technology', 'Advanced'),
    ('Music', 'Beginner'),
    ('Music', 'Intermediate'),
    ('Music', 'Advanced'),
    ('Arts', 'Beginner'),
    ('Arts', 'Intermediate'),
    ('Arts', 'Advanced'),
    ('Food & Drink', 'Beginner'),
    ('Food & Drink', 'Intermediate'),
    ('Food & Drink', 'Advanced');

CREATE TABLE Event(
	ID uuid DEFAULT uuid_generate_v4 (),
	Name VARCHAR(100) NOT NULL,
	StartTime timestamp without time zone,
	EndTime timestamp without time zone,
    Description VARCHAR(500) DEFAULT 'No description',
    StreetNumber INTEGER DEFAULT '0',
	StreetName VARCHAR(30) DEFAULT 'TBD',
	PostalCode VARCHAR(7) DEFAULT 'TBD',
    ChatID uuid NOT NULL,
    ActivityType VARCHAR(100) DEFAULT 'General',
	ActivityLevel VARCHAR(100) DEFAULT 'None',
	PRIMARY KEY(ID),
	FOREIGN KEY(ChatID) REFERENCES Chat ON DELETE NO ACTION,
	FOREIGN KEY(ActivityType, ActivityLevel) REFERENCES Activity (Type, Level) ON DELETE SET DEFAULT,
    FOREIGN KEY(StreetNumber, StreetName, PostalCode) REFERENCES Address(StreetNumber, StreetName, PostalCode) ON DELETE SET DEFAULT);

INSERT INTO Event
VALUES
    ('30e22a07-832b-4c2b-be5f-2eb2e50085f2','The Strokes Concert', '2020-03-05 07:30:00 PM', '2020-03-05 11:00:00 PM', 'Concert for the Strokes', 3135, 'West 4th Ave', 'V6K 1X6', 'bffea326-be23-46a4-bbbb-296cb9a9bc18', 'Music', 'Beginner'),
    ('461bc700-23be-463c-a07c-3d52db261e26', 'Paint Nite', '2020-03-20 05:00:00 PM', '2020-03-20 07:00:00 PM', 'Get together with a group of pals to paint some mountains!', 18702, 'Yonge Street', 'V3W 3G5', '31bc50df-d15b-444d-b360-c1c313b43103', 'Arts', 'Intermediate'),
    ('567a7f96-68b5-4e91-bb7f-190fc4f3ba44', 'The Grouse Grind', '2020-04-25 08:30:00 AM', '2020-04-25 04:00:00 PM', 'Let’s do the Grouse Grind. Meet at 8:30am, hike, and then eat afterwards.', 3425, '148 Street', 'V3S 4P5', '90cb8ff1-b30a-495a-afde-f1e2baf08e1a', 'Fitness', 'Advanced'),
    ('b4026227-01d9-4801-a0c7-d845587d266a', 'Pie Crawl', '2020-04-10 06:00:00 PM', '2020-04-10 09:00:00 PM', 'You’ve heard of a pub crawl - join a community of fellow pie lovers for a pie crawl. We’ll be heading to all the major pie shops.', 10724, 'Bird Road', 'V5K 6D3', 'fa5d90dc-bed3-47f3-8ce8-430100d39908', 'Food & Drink', 'Intermediate'),
    ('68f791c4-ef66-43c3-8fa0-7e213f2f8108', 'JavaScript and ML Meetup', '2020-03-13 06:00:00 PM', '2020-03-13 08:00:00 PM', 'An intro to Machine Learning with Tensorflow JS. The event will include implementation and a look into real world examples', 3194, 'Main Street', 'V7V 8KD', 'aa3432af-1257-46f7-aa0a-89ebb42b17db', 'Technology', 'Beginner'),
    ('501dcdfb-1459-484f-9e49-12879dd7d33e','Bubble Tea Sampling', '2020-06-05 02:30:00 PM', '2020-06-05 11:00:00 PM', 'Experience lots of different bubble tea flavours!', 9999, 'Rainbow Road', 'V6K 1J8', '04e20861-1e48-41c2-b328-d4ff9975e94d', 'Food & Drink', 'Intermediate'),
    ('40329aba-1c81-4876-893c-6c04498a84a9','Migoreng Eating Contest', '2020-04-12 02:30:00 PM', '2020-04-12 11:00:00 PM', 'Whoever can stomach the most migoreng wins $100 and a 5 boxes of migoreng!', 9999, 'Rainbow Road', 'V6K 1J8', '58b6408c-8831-4605-8ecf-b3ef65ecef22', 'Food & Drink', 'Intermediate'),
    ('de03c873-0fbe-4772-b29a-4671074e1c2d','Sushi Lessons', '2020-07-28 01:30:00 PM', '2020-07-28 3:00:00 PM', 'Learn to make authentic and delicious Japanese-style sushi rolls', 9999, 'Rainbow Road', 'V6K 1J8', 'ec2e8923-84de-4dc0-ad7f-c5162aa3231b', 'Food & Drink', 'Intermediate');

CREATE TABLE Review(
	ID uuid DEFAULT uuid_generate_v4 (),
	Comment VARCHAR(1000),
	Rating INTEGER,
    DatePosted timestamp without time zone,
	EventID uuid,
	PRIMARY KEY(ID),
	FOREIGN KEY(EventID) REFERENCES Event ON DELETE CASCADE);

INSERT INTO Review
VALUES
    ('e553646f-341e-4a00-849b-15f814a224d8', 'Was my favourite band in highschool! Glad I got to see them live - so good!', 5, '2020-03-06 01:34:00 PM', '30e22a07-832b-4c2b-be5f-2eb2e50085f2'),
    ('f593ecae-a1cf-4ab2-b270-af7ab204db79', 'Their new album was a bit meh. Glad they played a lot of their old stuff!', 4, '2020-03-07 02:32:00 PM', '30e22a07-832b-4c2b-be5f-2eb2e50085f2'),
    ('e18ec752-cdd1-4e5c-9e2f-bcd6b6e1686b', 'Absolutely horrible - the instructors painting didn’t even look like a mountain. Definitely was not intermediate level.', 1, '2020-03-22 09:00:00 PM', '461bc700-23be-463c-a07c-3d52db261e26'),
    ('e860ed62-bf37-4df5-b4fd-08410b8e14b9', 'Great organization, but could have been better if there were more projects that we looked at. Seemed like every other ML meetup - just importing in the library.', 3, '2020-03-20 02:23:00 PM', '68f791c4-ef66-43c3-8fa0-7e213f2f8108'),
    ('f08928c8-f165-43dd-b9f1-1dce894573f4', 'Ate some of the best pies ever!', 5, '2020-04-12 04:03:00 PM', 'b4026227-01d9-4801-a0c7-d845587d266a');

CREATE TABLE ReviewedBy(
	ReviewID uuid,
	ProfileID uuid,
	PRIMARY KEY(ReviewID, ProfileID),
	FOREIGN KEY(ReviewID) REFERENCES Review ON DELETE CASCADE,
	FOREIGN KEY(ProfileID) REFERENCES Profile ON DELETE CASCADE);

INSERT INTO ReviewedBy
VALUES
    ('e553646f-341e-4a00-849b-15f814a224d8', '1fd87df8-7106-43b1-866c-dc8673565ae2'),
    ('f593ecae-a1cf-4ab2-b270-af7ab204db79', '1fd87df8-7106-43b1-866c-dc8673565ae2'),
    ('e18ec752-cdd1-4e5c-9e2f-bcd6b6e1686b', '69b734c1-d441-45ea-82fc-fae17c129294'),
    ('e860ed62-bf37-4df5-b4fd-08410b8e14b9', 'd31c296d-6e8d-4eb1-9fa8-1a65a8d7cbb8'),
    ('f08928c8-f165-43dd-b9f1-1dce894573f4', '5478fb4e-2d75-4079-9ffd-7b5650e366cc');

CREATE TABLE Registered (
	ProfileID uuid,
	EventID uuid,
	isAdmin BOOLEAN DEFAULT false,
	PRIMARY KEY(ProfileID, EventID),
	FOREIGN KEY(ProfileID) REFERENCES Profile ON DELETE CASCADE,
	FOREIGN KEY(EventID) REFERENCES  Event ON DELETE CASCADE);

INSERT INTO Registered
VALUES
    ('1fd87df8-7106-43b1-866c-dc8673565ae2', '30e22a07-832b-4c2b-be5f-2eb2e50085f2', true),
    ('1fd87df8-7106-43b1-866c-dc8673565ae2', '68f791c4-ef66-43c3-8fa0-7e213f2f8108', true),
    ('69b734c1-d441-45ea-82fc-fae17c129294', '461bc700-23be-463c-a07c-3d52db261e26', true),
    ('d31c296d-6e8d-4eb1-9fa8-1a65a8d7cbb8', 'b4026227-01d9-4801-a0c7-d845587d266a', false),
    ('79b83a7e-2e29-4c1e-a2fe-b9c5ac4f18da', '68f791c4-ef66-43c3-8fa0-7e213f2f8108', true),
    ('79b83a7e-2e29-4c1e-a2fe-b9c5ac4f18da', '501dcdfb-1459-484f-9e49-12879dd7d33e', false),
	('69b734c1-d441-45ea-82fc-fae17c129294', '501dcdfb-1459-484f-9e49-12879dd7d33e', false),
	('d31c296d-6e8d-4eb1-9fa8-1a65a8d7cbb8', '501dcdfb-1459-484f-9e49-12879dd7d33e', false),
    ('1fd87df8-7106-43b1-866c-dc8673565ae2', '501dcdfb-1459-484f-9e49-12879dd7d33e', false),
	('5478fb4e-2d75-4079-9ffd-7b5650e366cc', '501dcdfb-1459-484f-9e49-12879dd7d33e', true),
    ('1fd87df8-7106-43b1-866c-dc8673565ae2', '40329aba-1c81-4876-893c-6c04498a84a9', false),
	('5478fb4e-2d75-4079-9ffd-7b5650e366cc', '40329aba-1c81-4876-893c-6c04498a84a9', true),
	('d31c296d-6e8d-4eb1-9fa8-1a65a8d7cbb8', '40329aba-1c81-4876-893c-6c04498a84a9', false),
    ('d31c296d-6e8d-4eb1-9fa8-1a65a8d7cbb8', 'de03c873-0fbe-4772-b29a-4671074e1c2d', false),
    ('1fd87df8-7106-43b1-866c-dc8673565ae2', 'de03c873-0fbe-4772-b29a-4671074e1c2d', false),
	('5478fb4e-2d75-4079-9ffd-7b5650e366cc', 'de03c873-0fbe-4772-b29a-4671074e1c2d', true);

CREATE TABLE Interests (
	ProfileID uuid,
	ActivityType VARCHAR(100) NOT NULL,
	ActivityLevel VARCHAR(100) NOT NULL,
	Public BOOLEAN,
	PRIMARY KEY(ProfileID, ActivityType, ActivityLevel),
	FOREIGN KEY (ProfileID) REFERENCES Profile ON DELETE CASCADE,
	FOREIGN KEY(ActivityType, ActivityLevel) REFERENCES Activity(Type, Level) ON DELETE CASCADE);

INSERT INTO Interests
VALUES
    ('1fd87df8-7106-43b1-866c-dc8673565ae2', 'Fitness', 'Advanced'),
    ('1fd87df8-7106-43b1-866c-dc8673565ae2', 'Technology', 'Beginner'),
    ('69b734c1-d441-45ea-82fc-fae17c129294', 'Arts', 'Intermediate'),
    ('d31c296d-6e8d-4eb1-9fa8-1a65a8d7cbb8', 'Music', 'Beginner'),
    ('5478fb4e-2d75-4079-9ffd-7b5650e366cc', 'Food & Drink', 'Intermediate');

CREATE TABLE RegularUser(
	Email VARCHAR(100),
	isModerator BOOLEAN DEFAULT false, 
	PRIMARY KEY(Email),
	FOREIGN KEY(Email) REFERENCES Account ON DELETE CASCADE);

INSERT INTO RegularUser
VALUES
    ('john@gmail.com', true),
    ('ayman@gmail.com', false),
    ('terry@gmail.com', false),
    ('emma@gmail.com', false),
    ('hazra@gmail.com', true);


CREATE TABLE AdminType(
	Type VARCHAR(10),
	CanEditAccount BOOLEAN DEFAULT false,
	CanEditEvent BOOLEAN DEFAULT false,
	CanEditAdmin BOOLEAN DEFAULT false,
	PRIMARY KEY(Type));

INSERT INTO AdminType
VALUES
    ('low', true, false, false),
    ('medium', true, true, false),
    ('high', true, true, true);

CREATE TABLE Admin(
    Email VARCHAR(100),
    Type VARCHAR(100) DEFAULT 'low',
    PRIMARY KEY(Email),
    FOREIGN KEY(Type) References AdminType ON DELETE SET DEFAULT,
    FOREIGN KEY(Email) References Account ON DELETE SET NULL);	

INSERT INTO Admin
VALUES
    ('john@gmail.com', 'low'),
    ('ayman@gmail.com', 'low'),
    ('terry@gmail.com', 'medium'),
    ('emma@gmail.com', 'medium'),
    ('hazra@gmail.com', 'high');
