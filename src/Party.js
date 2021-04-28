import PropTypes from 'prop-types'

export default class Party {
    /* attributes:
     * ownerId
     * id
     * name
     * imageURL
     * imageName
     * guestsIds
     */
    static defaultProps = {
        name: "Party",
        imageURL: "slip.jpg",
        imageName: "logo",
        guestsIDs: []
    }

    static propTypes = {
        ownerId: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        imageURL: PropTypes.string,
        imageName: PropTypes.string,
        guestsIDs: PropTypes.arrayOf(
            PropTypes.number
        )
    }

    constructor(ownerId, name) {
      this.ownerId = ownerId;
      this.name = name;
    }

    initMembers() {
        this.ownerId = 42;
        this.id = 4;
        this.name = "La fête du slip";
        this.imageURL = "slip.jpg";
        this.imageName = "Le slip français";
        this.guestsIDs = [2, 4, 8, 16, 32];
    }
}