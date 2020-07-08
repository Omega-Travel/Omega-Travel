const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "superJWTSecret";
const CONNECTION_STRING = process.env.CONNECTION_STRING || `mongodb+srv://dbAdmin:dbAdmin123@web-cluster-ito1a.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const User = mongoose.model("User", {
    fullname: String,
    email: String,
    password: String
});

const Trip = mongoose.model("Trip", {
    name: String,
    userId: String
})

const TripPlace = mongoose.model("TripPlace", {
    tripId: String,
    placeId: String
})

const Review = mongoose.model("Review", {
    userId: String,
    placeId: String,
    rating: String,
    description: String
});

const Place = mongoose.model("Place", {
    continentId: String,
    regionId: String,
    name: String,
    description: String,
    mainImageUrl: String
});

const Continent = mongoose.model("Continent", {
    name: String,
});

const Region = mongoose.model("Region", {
    name: String
});

const Activity = mongoose.model("Activity", {
    placeId: String,
    name: String,
    price: String
});

const Image = mongoose.model("Image", {
    placeId: String,
    url: String
});

const resolvers = {
    Query: {
        placesByContinent: (_, args) => {
            return Place.find({ continentId: args.continentId });
        },
        placesByRegion: (_, args) => {
            return Place.find({ regionId: args.regionId });
        },
        place: (_, args) => {
            return Place.findById(args.id);
        },
        user: (_, args) => {
            return User.findById(args.id);
        },
        activities: (_, args) => {
            return Activity.find({ placeId: args.placeId });
        },
        images: (_, args) => {
            return Image.find({ placeId: args.placeId });
        },
        image: (_, args) => {
            return Image.findOne({ placeId: args.placeId });
        },
        region: (_, args, context, info) => {
            return Region.findById(args.id);
        },
        reviews: (_, args, context, info) => {
            return Review.find({ placeId: args.placeId });
        },
        reviewsByUser: (_, args, context, info) => {
            return Review.find({ userId: args.userId });
        },
        trip: (_, args, context, info) => {
            return Trip.findById(args.id);
        },
        trips: (_, args, context, info) => {
            return Trip.find({ placeId: args.placeId });
        },
        tripsPlaces: (_, args, context, info) => {
            return TripPlace.find({ tripId: args.tripId });
        },
        users: () => User.find(),
        continents: () => Continent.find(),
        regions: () => Region.find()
    },
    Continent: {
        places(parent) {
            return Place.find({ continentId: parent.id });
        }
    },
    Region: {
        places(parent) {
            return Place.find({ regionId: parent.id });
        }
    },
    Place: {
        images(parent) {
            return Image.find({ placeId: parent.id });
        },
        activities(parent) {
            return Activity.find({ placeId: parent.id })
        },
        reviews(parent) {
           return Review.find({ placeId: parent.id });
        }
    },
    Review: {
        user(parent) {
            return User.findById(parent.userId);
        },
        reviewPlace(parent) {
            return Place.findById(parent.placeId);
        }
    },
    ReviewPlace: {
        place(parent) {
            return Place.findById(parent.placeId);
        }
    },
    Trip: {
        tripPlaces(parent) {
            return TripPlace.find({ tripId: parent.id });
        }
    },
    TripPlace: {
        place(parent) {
            return Place.findById(parent.placeId);
        }
    },
    Mutation: {
        login: async (_, { input }) => { 
            const user = await User.findOne({
                email: input.email, 
                password: input.password
            });
            if (user === null) {
                return {
                    ok: false,
                    error: "User not found"
                };
            }
            else {
                const { _id, email, fullname } = user;
                const token = jwt.sign({ _id, email, fullname }, JWT_SECRET);
                user.token = token;
                return {
                    ok: true,
                    user,
                }
            }
        },
        register: async (_, { input }) => {
            const user = await new User(input).save();
            const { _id, email, fullname } = user;
            const token = jwt.sign({ _id, email, fullname }, JWT_SECRET);
            user.token = token;
            return user;
        },
        registerTrip: async (_, { input }) => {
            let trip = await Trip.findOne({ name: input.name, userId: input.userId });
            if (trip === null) {
                trip = await new Trip(input).save();
                return {
                    ok: true,
                    trip
                }
            }
            else {
                return {
                    ok: false,
                    error: "Trip with that name already existe"
                };
            }
        },
        registerTripPlace: async (_, { input }) => {
            let tripPlace = await TripPlace.findOne({ tripId: input.tripId, placeId: input.placeId })
            if (tripPlace === null) {
                tripPlace = await new TripPlace(input).save();
                return {
                    ok: true,
                    tripPlace
                }
            }
            else {
                return {
                    ok: false,
                    error: "Place already exist in this trip"
                };
            }
        }, 
        registerContinent: (_, { input }) => {
            const continent = new Continent(input);
            return continent.save();
        },
        registerRegion: (_, { input }) => {
            const region = new Region(input);
            return region.save();
        },
        registerPlace: (_, { input }) => {
            const place = new Place(input);
            return place.save();
        },
        registerActivity: (_, { input }) => {
            const activity = new Activity(input);
            return activity.save();
        },
        registerImage: (_, { input }) => {
            const image = new Image(input);
            return image.save();
        },
        registerReview: (_, { input }) => {
            const review = new Review(input);
            return review.save();
        }
    }
};

module.exports = resolvers;
