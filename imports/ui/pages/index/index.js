import Index from './index.page';
import { withTracker } from 'meteor/react-meteor-data';
import withAnimate from "../../components/animate";

// export default withAnimate(withTracker((props) => {
//     return {
//         ...props,
//         user: Meteor.user
//     }
// })(Index));  
export default withAnimate(Index);  