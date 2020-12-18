USE ProfAppV2;

--SET IDENTITY_INSERT Province ON;
--INSERT INTO Province (ProvinceId, ProvinceName) VALUES (1, 'Nova Scotia');
--INSERT INTO Province (ProvinceId, ProvinceName) VALUES (2, 'Prince Edward Island');
--INSERT INTO Province (ProvinceId, ProvinceName) VALUES (3, 'Newfoundland');
--INSERT INTO Province (ProvinceId, ProvinceName) VALUES (4, 'New Brunswick');
--INSERT INTO Province (ProvinceId, ProvinceName) VALUES (5, 'Quebec');
--INSERT INTO Province (ProvinceId, ProvinceName) VALUES (6, 'Ontario');
--INSERT INTO Province (ProvinceId, ProvinceName) VALUES (7, 'Manitoba');
--INSERT INTO Province (ProvinceId, ProvinceName) VALUES (8, 'Saskatchewan');
--INSERT INTO Province (ProvinceId, ProvinceName) VALUES (9, 'Alberta');
--INSERT INTO Province (ProvinceId, ProvinceName) VALUES (10, 'British Columbia');
--SET IDENTITY_INSERT Province OFF;

--SET IDENTITY_INSERT School ON;
--INSERT INTO School (SchoolId, SchoolName, ProvinceId) VALUES (1, 'Acadia University', 1);
--INSERT INTO School (SchoolId, SchoolName, ProvinceId) VALUES (2, 'Dalhousie University', 1)
--INSERT INTO School (SchoolId, SchoolName, ProvinceId) VALUES (3, 'Concordia University', 5)
--INSERT INTO School (SchoolId, SchoolName, ProvinceId) VALUES (4, 'University of Ottawa', 6)
--SET IDENTITY_INSERT School OFF;

--SET IDENTITY_INSERT Prof ON;
--INSERT INTO Prof (ProfId, ProfFirstName, ProfLastName, SchoolId) VALUES (1, 'Andrew', 'Schulz', 1);
--INSERT INTO Prof (ProfId, ProfFirstName, ProfLastName, SchoolId) VALUES (2, 'Akaash', 'Singh', 2);
--INSERT INTO Prof (ProfId, ProfFirstName, ProfLastName, SchoolId) VALUES (3, 'Mark', 'Gagnon', 3);
--INSERT INTO Prof (ProfId, ProfFirstName, ProfLastName, SchoolId) VALUES (4, 'Alexx', 'Media', 4);
--SET IDENTITY_INSERT Prof OFF;

--SET IDENTITY_INSERT Student ON;
--INSERT INTO Student (StudentId, FirstName, LastName, Email, Password, Salt, RememberMe) VALUES (1, 'Colin', 'Murney', 'colin@gmail.com', '1KOj5pwxiaaZxQNsVyiBTXDV5gNfz2OBUx0ERtkBxdU=', 'Lnl/vy8b7OpQWrha2HIwhQ==', 0);
--INSERT INTO Student (StudentId, FirstName, LastName, Email, Password, Salt, RememberMe) VALUES (2, 'Will', 'Raby', 'will@gmail.com', '1KOj5pwxiaaZxQNsVyiBTXDV5gNfz2OBUx0ERtkBxdU=', 'Lnl/vy8b7OpQWrha2HIwhQ==', 0);
--INSERT INTO Student (StudentId, FirstName, LastName, Email, Password, Salt, RememberMe) VALUES (3, 'Alex', 'Roach', 'alex@gmail.com', '1KOj5pwxiaaZxQNsVyiBTXDV5gNfz2OBUx0ERtkBxdU=', 'Lnl/vy8b7OpQWrha2HIwhQ==', 0);
--INSERT INTO Student (StudentId, FirstName, LastName, Email, Password, Salt, RememberMe) VALUES (4, 'Joseph', 'Poulin', 'joseph@gmail.com', '1KOj5pwxiaaZxQNsVyiBTXDV5gNfz2OBUx0ERtkBxdU=', 'Lnl/vy8b7OpQWrha2HIwhQ==', 0);
--SET IDENTITY_INSERT Student OFF;

--SET IDENTITY_INSERT Post ON;
--INSERT INTO Post (PostId, ProfId, StudentId, Attachment, Date, Header, Body, Course) VALUES (1, 1, 1, 'C:\Users\colin\Desktop\ProfApp\attachments\Web_MEQ 35_Info_session_handout', '2020-12-02 19:00:00',
--	'Assignment directions', 'Look at the directions for this assignment. I can''t understand any of if', 'Introduction to Programming');
--SET IDENTITY_INSERT Post OFF;

--INSERT INTO Comment (PostId, StudentId, Date, Body) VALUES (1, 2, '2020-12-03 12:00:00', 'Thank you for posting this');
--INSERT INTO Comment (PostId, StudentId, Date, Body) VALUES (1, 1, '2020-12-03 12:25:00', 'My pleasure');

--INSERT INTO Upvote(PostId, StudentId, Date) VALUES (1, 2, '2020-12-02 20:00:00');
--INSERT INTO Upvote(PostId, StudentId, Date) VALUES (1, 3, '2020-12-04 15:34:56');

--INSERT INTO Downvote(PostId, StudentId, Date) VALUES (1, 4, '2020-12-05 10:29:09');
