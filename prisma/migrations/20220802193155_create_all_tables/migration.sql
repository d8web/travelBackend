-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT DEFAULT 'standard',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3),
    "city" TEXT,
    "work" TEXT,
    "avatar" TEXT DEFAULT 'avatar.jpg',
    "cover" TEXT DEFAULT 'cover.jpg',
    "paid" BOOLEAN DEFAULT false,
    "tokenPaid" TEXT,
    "usedTheMap" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_appointments" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "idAgency" TEXT NOT NULL,
    "idService" TEXT NOT NULL,
    "numberOfPeoples" TEXT NOT NULL,
    "appointmentDatetime" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "expiresIn" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attractives" (
    "id" TEXT NOT NULL,
    "idPark" TEXT NOT NULL,
    "type" TEXT DEFAULT 'Cachoeira',
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "cover" TEXT DEFAULT 'cover.jpg',
    "price" DOUBLE PRECISION NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "vehicleRecomended" BOOLEAN DEFAULT false,
    "polluted" BOOLEAN DEFAULT false,
    "guide" BOOLEAN DEFAULT false,
    "propertyPrivate" BOOLEAN DEFAULT true,
    "popularLocation" BOOLEAN DEFAULT false,
    "rate" DOUBLE PRECISION DEFAULT 4,
    "walkingLevel" TEXT DEFAULT 'Fácil/Médio',
    "averageWalkingTime" TEXT DEFAULT 'Entre 5 a 10 minutos',
    "slipperyStones" BOOLEAN DEFAULT true,
    "distanceOfCarrancas" TEXT NOT NULL,
    "placeForChildren" BOOLEAN DEFAULT true,
    "averageDepth" TEXT NOT NULL,
    "averageHeightOfFall" TEXT NOT NULL,
    "bestPhotos" BOOLEAN DEFAULT true,
    "observations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attractives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images_attractives" (
    "id" TEXT NOT NULL,
    "idAttractive" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_attractives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_relations" (
    "id" TEXT NOT NULL,
    "userFrom" TEXT NOT NULL,
    "userTo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_relations_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "post_likes" (
    "id" TEXT NOT NULL,
    "idPost" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "post_comments" (
    "id" TEXT NOT NULL,
    "idPost" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "post_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorites" (
    "id" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "idAttractive" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attractive_reviews" (
    "id" TEXT NOT NULL,
    "idAttractive" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "body" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attractive_reviews_pkey" PRIMARY KEY ("id")
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
    "facebook" TEXT,
    "instagram" TEXT,
    "othersSocialMedia" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images_parks" (
    "id" TEXT NOT NULL,
    "idPark" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_parks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "agencies" (
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
    "othersSocialMedia" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "idAgency" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "tours" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_availability" (
    "id" TEXT NOT NULL,
    "idAgency" TEXT,
    "weekday" INTEGER NOT NULL,
    "numberOfVacancies" INTEGER NOT NULL,
    "hours" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "servicesId" TEXT,

    CONSTRAINT "service_availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_reviews" (
    "id" TEXT NOT NULL,
    "idService" TEXT NOT NULL,
    "idAgency" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_testimonials" (
    "id" TEXT NOT NULL,
    "idAgency" TEXT NOT NULL,
    "idService" TEXT NOT NULL,
    "idUser" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images_agencies" (
    "id" TEXT NOT NULL,
    "idAgency" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_agencies_pkey" PRIMARY KEY ("id")
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
    "duration" TEXT NOT NULL,
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
CREATE TABLE "images_tours" (
    "id" TEXT NOT NULL,
    "idTour" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accommodations" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT DEFAULT 'cover.jpg',
    "phone" TEXT,
    "whatsapp" TEXT,
    "website" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "booking" TEXT,
    "othersSocialMedia" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "bestaccommodation" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accommodations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images_accommodations" (
    "id" TEXT NOT NULL,
    "idAccommodation" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_accommodations_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "address" TEXT,
    "image" TEXT DEFAULT 'cover.jpg',
    "website" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "othersSocialMedia" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images_business" (
    "id" TEXT NOT NULL,
    "idBusiness" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foods" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT DEFAULT 'cover.jpg',
    "phone" TEXT,
    "whatsapp" TEXT,
    "hourOpen" TEXT,
    "hourClosed" TEXT,
    "delivery" BOOLEAN DEFAULT true,
    "menu" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "website" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "othersSocialMedia" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "acceptReservation" BOOLEAN DEFAULT false,
    "acceptOrders" BOOLEAN DEFAULT false,
    "reference" TEXT,
    "bestfood" BOOLEAN,
    "observations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image_foods" (
    "id" TEXT NOT NULL,
    "idFood" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "image_foods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refresh_tokens_userId_key" ON "refresh_tokens"("userId");

-- AddForeignKey
ALTER TABLE "user_appointments" ADD CONSTRAINT "user_appointments_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attractives" ADD CONSTRAINT "attractives_idPark_fkey" FOREIGN KEY ("idPark") REFERENCES "parks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_attractives" ADD CONSTRAINT "images_attractives_idAttractive_fkey" FOREIGN KEY ("idAttractive") REFERENCES "attractives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_relations" ADD CONSTRAINT "user_relations_userFrom_fkey" FOREIGN KEY ("userFrom") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_comments" ADD CONSTRAINT "post_comments_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites" ADD CONSTRAINT "user_favorites_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attractive_reviews" ADD CONSTRAINT "attractive_reviews_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attractive_reviews" ADD CONSTRAINT "attractive_reviews_idAttractive_fkey" FOREIGN KEY ("idAttractive") REFERENCES "attractives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_parks" ADD CONSTRAINT "images_parks_idPark_fkey" FOREIGN KEY ("idPark") REFERENCES "parks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services" ADD CONSTRAINT "services_idAgency_fkey" FOREIGN KEY ("idAgency") REFERENCES "agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_availability" ADD CONSTRAINT "service_availability_idAgency_fkey" FOREIGN KEY ("idAgency") REFERENCES "agencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_availability" ADD CONSTRAINT "service_availability_servicesId_fkey" FOREIGN KEY ("servicesId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_reviews" ADD CONSTRAINT "service_reviews_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_reviews" ADD CONSTRAINT "service_reviews_idService_fkey" FOREIGN KEY ("idService") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_reviews" ADD CONSTRAINT "service_reviews_idAgency_fkey" FOREIGN KEY ("idAgency") REFERENCES "agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_testimonials" ADD CONSTRAINT "service_testimonials_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_testimonials" ADD CONSTRAINT "service_testimonials_idAgency_fkey" FOREIGN KEY ("idAgency") REFERENCES "agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_testimonials" ADD CONSTRAINT "service_testimonials_idService_fkey" FOREIGN KEY ("idService") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_agencies" ADD CONSTRAINT "images_agencies_idAgency_fkey" FOREIGN KEY ("idAgency") REFERENCES "agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tours" ADD CONSTRAINT "tours_idAgency_fkey" FOREIGN KEY ("idAgency") REFERENCES "agencies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_tours" ADD CONSTRAINT "images_tours_idTour_fkey" FOREIGN KEY ("idTour") REFERENCES "tours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_accommodations" ADD CONSTRAINT "images_accommodations_idAccommodation_fkey" FOREIGN KEY ("idAccommodation") REFERENCES "accommodations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "conversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images_business" ADD CONSTRAINT "images_business_idBusiness_fkey" FOREIGN KEY ("idBusiness") REFERENCES "business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_foods" ADD CONSTRAINT "image_foods_idFood_fkey" FOREIGN KEY ("idFood") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
