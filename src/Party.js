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
}