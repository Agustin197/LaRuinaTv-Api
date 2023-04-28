

function getAdventures(){
    const tales = [
        {
            id: 1,
            url: `${process.env.CLIENT_URL}/view/v=ZUdNWa8kL3E=_type_=serie=_id_=2`,
            name: "Ainulindalë"
        },
        {
            id: 2,
            url: "/adventures/gwerh-the-bard",
            name: "Gwerh, the Bard"
        }
    ]
    return tales
}

module.exports = {
    getAdventures
}