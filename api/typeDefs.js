const { gql } = require("apollo-server-micro");

const typeDefs = gql`
    type Query {
        user(id: ID!): User
        users: [User]
        
        trip(id: ID!): Trip
        trips(userId: ID!): [Trip]
        tripsPlaces(tripId: ID!): [TripPlace]
        
        reviewsByUser(userId: ID!): [Review]
        reviewPlaces(reviewId: ID!): [ReviewPlace]

        continents: [Continent]
        regions: [Region]
        region(id: ID!): Region

        place(id: ID!): Place
        placesByContinent(continentId: ID!): [Place]
        placesByRegion(regionId: ID!): [Place]
        activities(placeId: ID!): [Activity]
        images(placeId: ID!): [Image]
        image(placeId: ID!): Image
        reviews(placeId: ID!): [Review]
    }

    type Trip {
        id: ID
        name: String!
        userId: ID!
        tripPlaces: [TripPlace]
    }

    type TripPlace {
        id: ID
        tripId: ID!
        placeId: ID!
        place: Place
    }

    type Review {
        id: ID
        userId: ID!
        placeId: ID!
        rating: Int!
        description: String!
        user: User
        reviewPlace: Place
    }

    type ReviewPlace {
        id: ID
        reviewId: ID!
        placeId: ID!
        place: Place
    }

    type User {
        id: ID
        fullname: String!
        email: String!
        password: String!
        token: String
    }

    type Continent {
        id: ID
        name: String!
        places: [Place]
    }
    
    type Region {
        id: ID
        name: String!
        places: [Place]
    }

    type Place {
        id: ID
        name: String!
        description: String!
        mainImageUrl: String!
        continentId: ID!
        regionId: ID
        images: [Image]
        activities: [Activity]
        reviews: [Review]
    }

    type Activity {
        id: ID
        placeId: String!
        name: String!
        price: Int!
    }

    type Image {
        id: ID
        placeId: String!
        url: String!
    }

    type LoginResponse {
        user: User
        ok: Boolean!
        error: String
    }

    type TripResponse {
        trip: Trip
        ok: Boolean!
        error: String
    }

    type TripPlaceResponse {
        tripPlace: TripPlace
        ok: Boolean!
        error: String
    }

    type Mutation {
        login(input: LoginInput!): LoginResponse
        register(input: RegisterInput!): User!
        registerContinent(input: RegisterContinent!): Continent!
        registerRegion(input: RegisterRegion!): Region!
        registerPlace(input: RegisterPlace!): Place!
        registerActivity(input: RegisterActivity!): Activity!
        registerImage(input: RegisterImage!): Image!
        registerReview(input: RegisterReview!): Review!
        registerTrip(input: RegisterTrip!): TripResponse!
        registerTripPlace(input: RegisterTripPlace!): TripPlaceResponse!
    }

    input RegisterTripPlace {
        tripId: ID!
        placeId: ID!
    }

    input RegisterTrip {
        name: String!
        userId: ID!
    }

    input LoginInput {
        email: String!
        password: String!
    }

    input RegisterInput {
        fullname: String!
        email: String!
        password: String!
    }

    input RegisterContinent {
        name: String!
    }

    input RegisterRegion {
        name: String!
    }

    input RegisterPlace {
        name: String!
        description: String!
        mainImageUrl: String!
        continentId: ID!
        regionId: ID
    }

    input RegisterActivity {
        name: String!
        price: Int!
        placeId: ID!
    }

    input RegisterImage {
        url: String!
        placeId: ID!
    }

    input RegisterReview {
        userId: ID!
        placeId: ID!
        rating: Int!
        description: String!
    }
`;

module.exports = typeDefs;