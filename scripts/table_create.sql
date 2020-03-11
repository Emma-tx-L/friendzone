CREATE TABLE Account(
    Email VARCHAR(100),
    Password VARCHAR(100),
    PRIMARY KEY(Email));

CREATE TABLE Profile(
	ID INTEGER,
	Email VARCHAR(100),
	DOB DATE, 
	FirstName VARCHAR(100) NOT NULL,
	LastName VARCHAR(100) NOT NULL,
	PRIMARY KEY(ID),
	FOREIGN KEY(Email) REFERENCES Account ON DELETE CASCADE);

CREATE TABLE Availability (
	ProfileID INTEGER,
	StartDate DATE,
	EndDate DATE,
	Public BOOLEAN DEFAULT true,
	PRIMARY KEY(ProfileID, StartDate, EndDate),
	FOREIGN KEY(ProfileID) REFERENCES Profile(ID) ON DELETE CASCADE);

CREATE TABLE Region(
    PostalCode VARCHAR(7) PRIMARY KEY,
    Province VARCHAR(30),
    City VARCHAR(30));

CREATE TABLE Address(
	StreetNumber INTEGER,
	StreetName VARCHAR(30),
	PostalCode VARCHAR(7),
	PRIMARY KEY(PostalCode, StreetNumber, StreetName),
	FOREIGN KEY (PostalCode) REFERENCES Region(PostalCode) ON DELETE CASCADE);

CREATE TABLE Chat(
	ID INTEGER,
	Name VARCHAR(30) DEFAULT 'Chat',
	PRIMARY KEY(ID));

CREATE TABLE ChatComment(
	Time timestamp without time zone, 
	Content VARCHAR(50),
    ChatID INTEGER,
	ProfileID INTEGER DEFAULT '000',
	PRIMARY KEY(Time, ChatID, ProfileID),
	FOREIGN KEY(ChatID) REFERENCES Chat(ID) ON DELETE CASCADE,
	FOREIGN KEY(ProfileID) REFERENCES Profile(ID) ON DELETE SET DEFAULT);

CREATE TABLE Activity(
	Type VARCHAR(100),
	Level VARCHAR(100),
	PRIMARY KEY(Type, Level));

CREATE TABLE Event(
	ID INTEGER,
	Name VARCHAR(100) NOT NULL,
	StartTime timestamp without time zone,
	EndTime timestamp without time zone,
    Description VARCHAR(500) DEFAULT 'No description',
    StreetNumber INTEGER DEFAULT '0',
	StreetName VARCHAR(30) DEFAULT 'TBD',
	PostalCode VARCHAR(7) DEFAULT 'TBD',
    ChatID INTEGER NOT NULL,
    ActivityType VARCHAR(100) DEFAULT 'General',
	ActivityLevel VARCHAR(100) DEFAULT 'None',
	PRIMARY KEY(ID),
	FOREIGN KEY(ChatID) REFERENCES Chat ON DELETE NO ACTION,
	FOREIGN KEY(ActivityType, ActivityLevel) REFERENCES Activity (Type, Level) ON DELETE SET DEFAULT,
    FOREIGN KEY(StreetNumber, StreetName, PostalCode) REFERENCES Address(StreetNumber, StreetName, PostalCode) ON DELETE SET DEFAULT);

CREATE TABLE Review(
	ID INTEGER,
	Comment VARCHAR(1000),
	Rating INTEGER,
    DatePosted timestamp without time zone,
	EventID INTEGER,
	PRIMARY KEY(ID),
	FOREIGN KEY(EventID) REFERENCES Event ON DELETE CASCADE);

CREATE TABLE ReviewedBy(
	ReviewID INTEGER,
	ProfileID INTEGER,
	PRIMARY KEY(ReviewID, ProfileID),
	FOREIGN KEY(ReviewID) REFERENCES Review ON DELETE CASCADE,
	FOREIGN KEY(ProfileID) REFERENCES Profile ON DELETE CASCADE);

CREATE TABLE Registered (
	ProfileID INTEGER,
	EventID INTEGER,
	isAdmin BOOLEAN DEFAULT false,
	PRIMARY KEY(ProfileID, EventID),
	FOREIGN KEY(ProfileID) REFERENCES Profile ON DELETE CASCADE,
	FOREIGN KEY(EventID) REFERENCES  Event ON DELETE CASCADE);

CREATE TABLE Interests (
	ProfileID INTEGER,
	ActivityType VARCHAR(100) NOT NULL,
	ActivityLevel VARCHAR(100) NOT NULL,
	Public BOOLEAN,
	PRIMARY KEY(ProfileID, ActivityType, ActivityLevel),
	FOREIGN KEY (ProfileID) REFERENCES Profile ON DELETE CASCADE,
	FOREIGN KEY(ActivityType, ActivityLevel) REFERENCES Activity(Type, Level) ON DELETE CASCADE);

CREATE TABLE RegularUser(
	Email VARCHAR(100),
	isModerator BOOLEAN DEFAULT false, 
	PRIMARY KEY(Email),
	FOREIGN KEY(Email) REFERENCES Account ON DELETE CASCADE);

CREATE TABLE AdminType(
	Type VARCHAR(10),
	CanEditAccount BOOLEAN DEFAULT false,
	CanEditEvent BOOLEAN DEFAULT false,
	CanEditAdmin BOOLEAN DEFAULT false,
	PRIMARY KEY(Type));

CREATE TABLE Admin(
    Email VARCHAR(100),
    Type VARCHAR(100) DEFAULT 'low',
    PRIMARY KEY(Email),
    FOREIGN KEY(Type) References AdminType ON DELETE SET DEFAULT,
    FOREIGN KEY(Email) References Account ON DELETE SET NULL);	