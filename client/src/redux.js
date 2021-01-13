var user2 ={
    ...user,
    adress:{
        ...user.adress
    }
};

// deep copy no shalow copy, copyied every nestednes, so its not mutating the original one