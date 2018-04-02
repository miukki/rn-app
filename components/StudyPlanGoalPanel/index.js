import React from 'react' // eslint-disable-line no-unused-vars
import { View, Text, Icon, H3 } from 'native-base'
import { Platform, TouchableOpacity } from 'react-native'
import styles from './styles'

import DaysPicker from './DaysPicker'

export default props => (
  <View style={styles.card}>
    {props.wordsListComplete ? null : (
      <DaysPicker {...props} style={styles.planTrigger} />
    )}

    <TouchableOpacity
      style={styles.planTrigger}
      onPress={() => {
        props.navigation.navigate('SelectWordsList')
      }}
    >
      <H3
        style={{
          flex: 1,
          color: '#2F4E77',
          paddingLeft: Platform.OS === 'ios' ? null : 10
        }}
        numberOfLines={1}
      >
        {props.wordsListUid}
      </H3>
      <View
        style={{
          width: null,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          paddingRight: Platform.OS === 'ios' ? null : 18
        }}
      >
        <Icon
          name="arrow-dropdown"
          active
          style={
            Platform.OS === 'ios' ? styles.planIconiOS : styles.planIconAndroid
          }
        />
      </View>
    </TouchableOpacity>

    <View
      style={{
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginTop: 10,
        paddingTop: 15
      }}
    >
      <Text style={styles.stat}>Words Studied</Text>
      <Text style={[styles.stat, styles.statNumber]}>
        {props.learnedWordsInWordsList.length}/{props.wordsListWordsAmount}
      </Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.stat}>Days Left</Text>
      <Text style={[styles.stat, styles.statNumber]}>{props.daysLeft}</Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.stat}>Checked In</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          width: '50%',
          justifyContent: 'flex-end'
        }}
      >
        <Icon
          name="star"
          active
          style={{ color: 'orange', fontSize: 16, lineHeight: 35 }}
        />
        <Text style={[styles.stat, styles.statNumber]}>
          {props.checkinLogs.length} days
        </Text>
      </View>
    </View>
  </View>
)
