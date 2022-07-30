-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3),
    "city" TEXT,
    "work" TEXT,
    "avatar" TEXT DEFAULT 'avatar.jpg',
    "cover" TEXT DEFAULT 'cover.jpg',
    "paid" BOOLEAN DEFAULT false,
    "usedTheMap" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refreshtoken" (
    "id" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "refreshtoken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attractives" (
    "id" TEXT NOT NULL,
    "idPark" TEXT NOT NULL,
    "type" TEXT DEFAULT 'Cachoeira',
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "vehicleRecomended" BOOLEAN NOT NULL,
    "polluted" BOOLEAN DEFAULT false,
    "guide" BOOLEAN DEFAULT false,
    "propertyPrivate" BOOLEAN DEFAULT true,
    "popularLocation" BOOLEAN DEFAULT false,
    "rate" DOUBLE PRECISION DEFAULT 4,
    "walkingLevel" TEXT DEFAULT 'Fácil/Médio',
    "averageWalkingTime" TEXT NOT NULL,
    "slipperyStones" BOOLEAN DEFAULT true,
    "distanceOfCarrancas" TEXT NOT NULL,
    "placeForChildren" BOOLEAN DEFAULT true,
    "averageDepth" TEXT NOT NULL,
    "averageHeightOfFall" TEXT NOT NULL,
    "bestPhotos" BOOLEAN DEFAULT true,
    "observations" TEXT,

    CONSTRAINT "attractives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userrelations" (
    "id" TEXT NOT NULL,
    "userFrom" TEXT NOT NULL,
    "userTo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userrelations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postlikes" (
    "id" TEXT NOT NULL,
    "idPost" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "postlikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "postcomments" (
    "id" TEXT NOT NULL,
    "idPost" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "postcomments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "idAttractive" TEXT NOT NULL,
    "cover" TEXT DEFAULT 'cover.jpg',
    "url" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userfavorites" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "idAttractive" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userfavorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "idAttractive" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "body" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT DEFAULT 'cover.jpg',
    "price" DOUBLE PRECISION NOT NULL,
    "phone" TEXT,
    "whatsapp" TEXT,
    "wifi" BOOLEAN NOT NULL,
    "bath" BOOLEAN NOT NULL,
    "restaurant" BOOLEAN NOT NULL,
    "parking" BOOLEAN NOT NULL,
    "private" BOOLEAN NOT NULL,
    "hotel" BOOLEAN NOT NULL,
    "mainWaterfall" TEXT,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "type" TEXT DEFAULT 'agency',
    "image" TEXT DEFAULT 'cover.jpg',
    "website" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "otherSocialMedia" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tours" (
    "id" TEXT NOT NULL,
    "idAgency" TEXT NOT NULL,
    "attractives" TEXT[],
    "name" TEXT NOT NULL,
    "meansOfLocomotion" TEXT NOT NULL,
    "guidesOnVehicleClient" BOOLEAN DEFAULT false,
    "background" TEXT DEFAULT 'cover.jpg',
    "video" TEXT DEFAULT 'cover.jpg',
    "groups" BOOLEAN NOT NULL,
    "maxPeople" INTEGER,
    "minPeople" INTEGER DEFAULT 0,
    "pricePerPeople" DOUBLE PRECISION NOT NULL,
    "specialPrice" DOUBLE PRECISION,
    "descriptionTour" TEXT,
    "whatsToTake" TEXT,
    "hasWalk" BOOLEAN DEFAULT true,
    "observations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accommodations" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT DEFAULT 'cover.jpg',
    "phone" TEXT,
    "whatsapp" TEXT,
    "website" TEXT,
    "booking" TEXT,
    "bestaccommodation" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accommodations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conversations" (
    "id" TEXT NOT NULL,
    "members" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "type" TEXT NOT NULL,
    "image" TEXT DEFAULT 'cover.jpg',
    "website" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "otherSocialMedia" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "refreshtoken_userId_key" ON "refreshtoken"("userId");

-- AddForeignKey
ALTER TABLE "refreshtoken" ADD CONSTRAINT "refreshtoken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attractives" ADD CONSTRAINT "attractives_idPark_fkey" FOREIGN KEY ("idPark") REFERENCES "parks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userrelations" ADD CONSTRAINT "userrelations_userFrom_fkey" FOREIGN KEY ("userFrom") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postlikes" ADD CONSTRAINT "postlikes_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postlikes" ADD CONSTRAINT "postlikes_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postcomments" ADD CONSTRAINT "postcomments_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "postcomments" ADD CONSTRAINT "postcomments_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_idAttractive_fkey" FOREIGN KEY ("idAttractive") REFERENCES "attractives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userfavorites" ADD CONSTRAINT "userfavorites_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_idAttractive_fkey" FOREIGN KEY ("idAttractive") REFERENCES "attractives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_idAgency_fkey" FOREIGN KEY ("idAgency") REFERENCES "agency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
