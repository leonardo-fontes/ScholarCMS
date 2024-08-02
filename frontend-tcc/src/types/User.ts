

export type User = {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    pronoun?: string;
    infos_about: {
        about: string;
        beapart: string;
        biography: string;
        birthdate: string;
        cause: string;
        commercialpartner: string;
        disability: string;
        gender: string;
        interests: string;
        location: string;
        mobilelogin: string;
        profession: string;
        challenge: { title: string; description: string };
        adaptations: { title: string; description: string };
        studies: string;
        theinterests: string;
     
    };
    photo_cover: string;
    photo_profile: string;
    rectype: string;
    time_created: string;
    type: string;
    username: string;
};

