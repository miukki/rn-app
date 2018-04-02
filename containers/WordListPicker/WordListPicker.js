import { connect } from 'react-redux'
import { ProgressListPicker } from 'prepsmith-react-native-components'
import { selectItems } from '../../redux-modules/wordlist/selector'

const mapStateToProps = (state, ownProps) => ({
  items: selectItems(state.toJS())
})

export default connect(mapStateToProps)(ProgressListPicker)
