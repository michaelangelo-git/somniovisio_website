export type selection = 'macro' | 'landscape' | 'automotive' | 'creative' | 'portrait' | 'SOMNIOVISIO';
export type ViewGallery = {
    type: selection,
    mainPhoto: string,
    otherPhotos: string[]
}

export var galleryPhotos: ViewGallery[] =
    [
        {
            type: 'macro',
            mainPhoto: '../../assets/images/macro/flower-5.jpg',
            otherPhotos: [
                '../../assets/images/macro/20240612-DSC00058.jpg'
            ]
        },
        {
            type: 'landscape',
            mainPhoto: '../../assets/images/landscape/hydrodam-2.jpg',
            otherPhotos: [

            ]
        },
        {
            type: 'automotive',
            mainPhoto: '../../assets/images/auto/audi_rs5.jpg',
            otherPhotos: [

            ]
        },
        {
            type: 'creative',
            mainPhoto: '../../assets/images/creative/20240612-DSC00065.jpg',
            otherPhotos: [

            ]
        },
        {
            type: 'portrait',
            mainPhoto: '../../assets/images/portrait/20240831-DSC00192.jpg',
            otherPhotos: [

            ]
        },
    ];

