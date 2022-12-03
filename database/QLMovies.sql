DROP TABLE IF EXISTS "Movie";

CREATE TABLE "Movie" (
    "id" varchar(4) NOT NULL,
    "img" varchar(255) NOT NULL,
    "title" varchar(50) NOT NULL,
    "year" int NOT NULL,
    "topRank" int NOT NULL,
    "rating" float NOT NULL,
    "ratingCount" int NOT NULL,
    "genres" varchar(255) NOT NULL
);

DROP TABLE IF EXISTS "Account";

CREATE TABLE "Account" (
    "username" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL
);

DROP TABLE IF EXISTS "Person";

CREATE TABLE "Person" (
    "id" varchar(10) NOT NULL,
    "image" varchar(255) NOT NULL,
    "name" varchar(50) NOT NULL,
    "gender" varchar(6) NOT NULL,
    "legacyNameText" varchar(100) NOT NULL,
    "birthDate" date,
    "birthPlace" varchar(255),
    "genres" varchar(255),
    "heightCentimeters" float,
    "nicknames" varchar(255) NOT NULL,
    "realName" varchar(255)
);

DROP TABLE IF EXISTS "Cast";

CREATE TABLE "Cast" (
    "idPerson" varchar(10) NOT NULL,
    "idMovie" varchar(10) NOT NULL,
    "characters" varchar(255) NOT NULL
);

DROP TABLE IF EXISTS "Synopses";

CREATE TABLE "Synopses" (
    "idMovie" varchar(10) NOT NULL,
    "hasProfanity" boolean NOT NULL,
    "language" varchar(10) NOT NULL,
    "text" text NOT NULL
);

DROP TABLE IF EXISTS "Review";

CREATE TABLE "Review" (
    "idMovie" varchar(10) NOT NULL,
    "author" varchar(50) NOT NULL,
    "authorRating" int NOT NULL,
    "helpfullnessScore" float NOT NULL,
    "interestingVotes_Down" int NOT NULL,
    "interestingVotes_Up" int NOT NULL,
    "panguageCode" varchar(10) NOT NULL,
    "reviewTitle" varchar(50) NOT NULL,
    "submissionDate" date NOT NULL
);