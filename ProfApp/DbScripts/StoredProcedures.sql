--USE ProfAppV2;

--CREATE OR ALTER PROCEDURE GetPostsWithVote @StudentId int
--AS
--BEGIN
--WITH votedPosts (PostId, Date, Course, Header, Body, Attachment, StudentId, ProfId, Vote)
--AS
--(
--SELECT Post.PostId, Post.Date, Post.Course, Post.Header, Post.Body, Post.Attachment, Post.StudentId, Post.ProfId, 1 AS vote
--FROM Post, Upvote
--WHERE Post.PostId = Upvote.PostId AND Upvote.StudentId = @StudentId
--UNION
--SELECT Post.PostId, Post.Date, Post.Course, Post.Header, Post.Body, Post.Attachment, Post.ProfId, Post.StudentId, 0 AS vote
--FROM Post, Downvote
--WHERE Post.PostId = Downvote.PostId AND Downvote.StudentId = @StudentId
--)
--SELECT * FROM votedPosts
--UNION
--SELECT *, null as VOTE
--FROM Post
--WHERE PostId NOT IN (
--	SELECT PostId
--	FROM votedPosts
--	)
--ORDER BY Date desc;
--END;

EXEC dbo.GetPostsWithVote @StudentId = 1;