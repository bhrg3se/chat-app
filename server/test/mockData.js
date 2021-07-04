const mockConvos = [
    {
        "id": 1,
        "messages": [
            {
                "id": 1,
                "text": "Where are you from?",
                "senderId": 2,
                "seen": true,
                "createdAt": "2021-06-29T06:12:27.131Z",
                "updatedAt": "2021-07-01T16:28:58.945Z",
                "conversationId": 1
            },
            {
                "id": 2,
                "text": "I'm from New York",
                "senderId": 1,
                "seen": true,
                "createdAt": "2021-06-29T06:12:27.133Z",
                "updatedAt": "2021-07-01T08:37:54.540Z",
                "conversationId": 1
            },
            {
                "id": 3,
                "text": "Share photo of your city, please",
                "senderId": 2,
                "seen": true,
                "createdAt": "2021-06-29T06:12:27.135Z",
                "updatedAt": "2021-07-01T16:28:58.945Z",
                "conversationId": 1
            },
        ],
        "user1": null,
        "user2": {
            "id": 2,
            "username": "santiago",
            "photoUrl": "https://res.cloudinary.com/dmlvthmqr/image/upload/v1607914466/messenger/775db5e79c5294846949f1f55059b53317f51e30_s3back.png"
        },
        "toJSON": function () {
            return this
        }
    }
]

module.exports = {
    mockConvos
}
