INSERT INTO Account
VALUES
    ('john@gmail.com', '123456'),
    ('ayman@gmail.com', '123456'),
    ('terry@gmail.com', '123456'),
    ('emma@gmail.com', '123456'),
    ('hazra@gmail.com', '123456');

INSERT INTO Profile(ID, Email, DOB, FirstName, LastName)
VALUES
    (1, 'john@gmail.com', '1992-10-20', 'John', 'Aguilar'),
    (2, 'ayman@gmail.com', '1995-02-03', 'Ayman', 'Azhar'),
    (3, 'terry@gmail.com', '1997-03-12', 'Terry', 'Zhang'),
    (4, 'emma@gmail.com', '1994-12-10', 'Emma', 'Liu'),
    (5, 'hazra@gmail.com', '1990-12-10', 'Hazra', 'Imran');

INSERT INTO Availability
VALUES
    (1, '2020-03-03', '2020-03-14', true),
    (2, '2020-03-02', '2020-03-24', false),
    (3, '2020-04-03', '2020-05-13', true),
    (4, '2020-04-05', '2020-04-28', true),
    (5, '2020-03-01', '2020-03-24', false);

INSERT INTO Region
VALUES
    ('V6K 1X6', 'Vancouver', 'BC'),
    ('V3W 3G5', 'Toronto', 'ON'),
    ('V3S 4P5', 'Surrey', 'BC'),
    ('V5K 6D3', 'Richmond', 'BC'),
    ('V7V 8KD', 'Vancouver', 'BC');

INSERT INTO Address
VALUES 
    (3135, 'West 4th Ave', 'V6K 1X6'),
    (18702, 'Yonge Street', 'V3W 3G5'),
    (3425, '148 Street', 'V3S 4P5'),
    (10724, 'Bird Road', 'V5K 6D3'),
    (3194, 'Main Street', 'V7V 8KD');

INSERT INTO Chat
VALUES
    (1, 'Stoked for the Strokes'),
    (2, 'Painting Pals'),
    (3, 'The Grind'),
    (4, 'Pie Crawl'),
    (5, 'Machine Learning and JS Event');

INSERT INTO ChatComment 
VALUES
    ('2020-03-02 03:23:00 PM', 'What time are we meeting?', 1, 2),
    ('2020-04-10 05:53:00 PM', 'Almost there!!', 4, 1),
    ('2020-04-10 05:53:00 PM', 'Cool, we’re all waiting outside the pie shop.', 4, 2),
    ('2020-03-05 03:33:00 PM', 'Anyone know who’s opening?', 1, 5),
    ('20200307 07:34:00 PM', 'Are we using acrylic or oil paints?', 2, 3);

INSERT INTO Activity
VALUES
    ('Fitness', 'Beginner'),
	('Fitness', 'Advanced'),
    ('Technology', 'Beginner'),
    ('Music', 'Beginner'),
    ('Arts', 'Intermediate'),
    ('Food & Drink', 'Intermediate');


INSERT INTO Event
VALUES
    (1,'The Strokes Concert', '2020-03-05 07:30:00 PM', '2020-03-05 11:00:00 PM', 'Concert for the Strokes', 3135, 'West 4th Ave', 'V6K 1X6', 1, 'Music', 'Beginner'),
    (2, 'Paint Nite', '2020-03-20 05:00:00 PM', '2020-03-20 07:00:00 PM', 'Get together with a group of pals to paint some mountains!', 18702, 'Yonge Street', 'V3W 3G5', 2, 'Arts', 'Intermediate'),
    (3, 'The Grouse Grind', '2020-04-25 08:30:00 AM', '2020-04-25 04:00:00 PM', 'Let’s do the Grouse Grind. Meet at 8:30am, hike, and then eat afterwards.', 3425, '148 Street', 'V3S 4P5', 3, 'Fitness', 'Advanced'),
    (4, 'Pie Craw', '2020-04-10 06:00:00 PM', '2020-04-10 09:00:00 PM', 'You’ve heard of a pub crawl - join a community of fellow pie lovers for a pie crawl. We’ll be heading to all the major pie shops.', 10724, 'Bird Road', 'V5K 6D3', 4, 'Food & Drink', 'Intermediate'),
    (5, 'JavaScript and ML Meetup', '2020-03-13 06:00:00 PM', '2020-03-13 08:00:00 PM', 'An intro to Machine Learning with Tensorflow JS. The event will include implementation and a look into real world examples', 3194, 'Main Street', 'V7V 8KD', 5, 'Technology', 'Beginner');

INSERT INTO Review
VALUES
    (1, 'Was my favourite band in highschool! Glad I got to see them live - so good!', 5, '2020-03-06 01:34:00 PM', 1),
    (2, 'Their new album was a bit meh. Glad they played a lot of their old stuff!', 4, '2020-03-07 02:32:00 PM', 1),
    (3, 'Absolutely horrible - the instructors painting didn’t even look like a mountain. Definitely was not intermediate level.', 1, '2020-03-22 09:00:00 PM', 2),
    (4, 'Great organization, but could have been better if there were more projects that we looked at. Seemed like every other ML meetup - just importing in the library.', 3, '2020-03-20 02:23:00 PM', 5),
    (5, 'Ate some of the best pies ever!', 5, '2020-04-12 04:03:00 PM', 4);

INSERT INTO ReviewedBy
VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 3),
    (5, 4);

INSERT INTO Registered
VALUES
    (1, 1, true),
    (1, 5, true),
    (2, 2, true),
    (3, 4, false),
    (5, 5, true);

INSERT INTO Interests
VALUES
    (1, 'Fitness', 'Advanced'),
    (1, 'Technology', 'Beginner'),
    (2, 'Arts', 'Intermediate'),
    (3, 'Music', 'Beginner'),
    (4, 'Food & Drink', 'Intermediate');

INSERT INTO RegularUser
VALUES
    ('john@gmail.com', true),
    ('ayman@gmail.com', false),
    ('terry@gmail.com', false),
    ('emma@gmail.com', false),
    ('hazra@gmail.com', true);

INSERT INTO AdminType
VALUES
    ('low', true, false, false),
    ('medium', true, true, false),
    ('high', true, true, true);

INSERT INTO Admin
VALUES
    ('john@gmail.com', 'low'),
    ('ayman@gmail.com', 'low'),
    ('terry@gmail.com', 'medium'),
    ('emma@gmail.com', 'medium'),
    ('hazra@gmail.com', 'high');
