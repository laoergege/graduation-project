Meteor.publish('Meteor.users.initials', function () {
    if (Meteor.userId) {
        switch (Meteor.user().profile.role) {
            case 1:
                return Meteor.users.find({}, { fields: { _id: 1, username: 1, email: 1, profile: 1, permissions: 1 } })
                break;
            default:
                return Meteor.users.find({_id: Meteor.userId()}, { fields: { _id: 1, username: 1, email: 1, profile: 1, permissions: 1 } })
                break;
        }   
    }else{
        return this.ready();
    }
})