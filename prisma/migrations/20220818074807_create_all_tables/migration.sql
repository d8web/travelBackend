-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT DEFAULT 'standard',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3),
    "address" TEXT,
    "contactNumber" TEXT,
    "city" TEXT,
    "work" TEXT,
    "avatar" TEXT DEFAULT 'avatar.jpg',
    "cover" TEXT DEFAULT 'cover.jpg',
    "paid" BOOLEAN DEFAULT false,
    "tokenPaid" TEXT,
    "usedTheMap" INTEGER DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "whereAreYouStaying" TEXT,
    "roomNumber" INTEGER,
    "deliveryNote" TEXT,
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
    "numberOfPeoples" INTEGER NOT NULL,
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
    "idPark" TEXT,
    "type" TEXT DEFAULT 'Cachoeira',
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "cover" TEXT DEFAULT 'cover.jpg',
    "latitude" VARCHAR(50) NOT NULL,
    "longitude" VARCHAR(50) NOT NULL,
    "vehicleRecomended" BOOLEAN DEFAULT false,
    "polluted" BOOLEAN DEFAULT false,
    "guide" BOOLEAN DEFAULT false,
    "propertyPrivate" BOOLEAN DEFAULT true,
    "popularLocation" BOOLEAN DEFAULT false,
    "walkingLevel" VARCHAR(100) DEFAULT 'Fácil/Médio',
    "averageWalkingTime" TEXT DEFAULT 'Entre 5 a 10 minutos',
    "slipperyStones" BOOLEAN DEFAULT true,
    "distanceOfCarrancas" VARCHAR(50) NOT NULL,
    "placeForChildren" BOOLEAN DEFAULT true,
    "averageDepth" VARCHAR(100) NOT NULL,
    "averageHeightOfFall" VARCHAR(100) NOT NULL,
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
    "type" VARCHAR(20) NOT NULL,
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
    "phone" VARCHAR(50),
    "whatsapp" VARCHAR(50),
    "wifi" BOOLEAN DEFAULT false,
    "bath" BOOLEAN DEFAULT false,
    "restaurant" BOOLEAN DEFAULT false,
    "parking" BOOLEAN DEFAULT true,
    "private" BOOLEAN DEFAULT true,
    "hotel" BOOLEAN DEFAULT false,
    "mainWaterfall" TEXT,
    "latitude" VARCHAR(50) NOT NULL,
    "longitude" VARCHAR(50) NOT NULL,
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
    "phone" VARCHAR(50),
    "whatsapp" VARCHAR(50),
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
    "price" DOUBLE PRECISION NOT NULL,
    "tours" TEXT[],
    "duration" VARCHAR(50) NOT NULL,
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
    "maxPeople" INTEGER,
    "minPeople" INTEGER DEFAULT 0,
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
    "vehicle" TEXT,
    "attractives" TEXT[],
    "name" TEXT NOT NULL,
    "meansOfLocomotion" TEXT NOT NULL,
    "guidesOnVehicleClient" BOOLEAN DEFAULT false,
    "background" TEXT DEFAULT 'cover.jpg',
    "video" TEXT DEFAULT 'cover.jpg',
    "groups" BOOLEAN NOT NULL,
    "pricePerPeople" DOUBLE PRECISION NOT NULL,
    "duration" VARCHAR(20),
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
    "acceptPets" BOOLEAN DEFAULT false,
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
    "type" VARCHAR(50) NOT NULL,
    "typeFood" TEXT[] DEFAULT ARRAY['all']::TEXT[],
    "name" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "image" TEXT DEFAULT 'cover.jpg',
    "businessPermit" TEXT,
    "number" VARCHAR(15) NOT NULL,
    "phone" VARCHAR(50),
    "whatsapp" VARCHAR(50),
    "hourOpen" VARCHAR(10),
    "hourClosed" VARCHAR(10),
    "delivery" BOOLEAN DEFAULT true,
    "website" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "othersSocialMedia" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "acceptReservation" BOOLEAN DEFAULT false,
    "acceptOrders" BOOLEAN DEFAULT false,
    "reference" TEXT,
    "mainCourse" TEXT,
    "driversRate" DOUBLE PRECISION NOT NULL,
    "latitude" VARCHAR(100),
    "longitude" VARCHAR(100),
    "acceptPets" BOOLEAN DEFAULT false,
    "bestFood" BOOLEAN DEFAULT false,
    "registrationStatus" VARCHAR(100) DEFAULT 'pendente',
    "observations" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_list" (
    "id" TEXT NOT NULL,
    "foodId" TEXT,
    "foodName" TEXT NOT NULL,
    "deliveryTime" TEXT NOT NULL,
    "pricePerServing" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'cover.jpg',
    "description" TEXT NOT NULL,
    "status" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "delivery_drivers" (
    "id" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "nameCompleted" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactNumber" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "profilePicture" TEXT DEFAULT 'cover.jpg',
    "driversLicense" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accountStatus" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food_feedbacks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "status" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "food_feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "orderCode" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "orderDateTime" TIMESTAMP(3) NOT NULL,
    "foodId" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "deliveryCharge" DOUBLE PRECISION NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "driverId" TEXT,
    "status" INTEGER DEFAULT 1,
    "processedBy" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deliveryDriverId" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_food" (
    "id" TEXT NOT NULL,
    "completeName" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "completeAddress" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "idFood" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_food_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "attractives" ADD CONSTRAINT "attractives_idPark_fkey" FOREIGN KEY ("idPark") REFERENCES "parks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "food_list" ADD CONSTRAINT "food_list_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_feedbacks" ADD CONSTRAINT "food_feedbacks_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "food_feedbacks" ADD CONSTRAINT "food_feedbacks_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_deliveryDriverId_fkey" FOREIGN KEY ("deliveryDriverId") REFERENCES "delivery_drivers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "food_list"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "admin_food" ADD CONSTRAINT "admin_food_idFood_fkey" FOREIGN KEY ("idFood") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_foods" ADD CONSTRAINT "image_foods_idFood_fkey" FOREIGN KEY ("idFood") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
