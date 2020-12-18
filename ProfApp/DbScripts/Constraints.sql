
--ALTER TABLE Downvote
--ADD CONSTRAINT chk_UpvoteExists
--CHECK (dbo.checkIfUpvoteExists(PostId, StudentId) = 1);

--ALTER TABLE Upvote
--ADD CONSTRAINT chk_DownVoteExists
--CHECK (dbo.checkIfDownvoteExists(PostId, StudentId) = 1);