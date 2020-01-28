import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// React Native uses https://yogalayout.com
// See https://yogalayout.com/playground to create layouts

export default class App extends Component {
  render() {
    // -01- As we already know: Flex views take the full space of their parent
    // according to the value of the flex property
    // return (
    //   <View style={{ flex: 1 }}>
    //     <View style={{ flex: 1, backgroundColor: 'red' }}></View>
    //     <View style={{ flex: 2, backgroundColor: 'green' }}></View>
    //     <View style={{ flex: 3, backgroundColor: 'blue' }}></View>
    //   </View>
    // );

    // -02- the direction of the main axis can be controlled using flexDirection
    // return (
    //   <View style={{ flex: 1, flexDirection: 'row' /* 'column' 'column-reverse' 'row-reverse' */ }}>
    //     <View style={{ height: 100, width: 100, backgroundColor: 'red' }}></View>
    //     <View style={{ height: 100, width: 100, backgroundColor: 'green' }}></View>
    //     <View style={{ height: 100, width: 100, backgroundColor: 'blue' }}></View>
    //   </View>
    // );

    // -03- justifyContent can be used to position the child nodes along the main axis, flex-start is default
    // return (
    //   <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' /* 'flex-end' 'center' 'space-between' 'space-around' 'space-evenly' */ }}>
    //     <View style={{ height: 100, width: 100, backgroundColor: 'red' }}></View>
    //     <View style={{ height: 100, width: 100, backgroundColor: 'green' }}></View>
    //     <View style={{ height: 100, width: 100, backgroundColor: 'blue' }}></View>
    //   </View>
    // );

    // -04- alignItems can be used to position the child nodes along the cross axis, stretch is default
    // Items can only be 'stretched' if they have no width/height (depending on the direction of the cross axis)
    // Don't use baseline. It only works well on iOS
    // return (
    //   <View style={{ flex: 1, flexDirection: 'column', alignItems: 'stretch' /* 'center' 'flex-start' 'flex-end'*/ }}>
    //     <View style={{ height: 100, width: 100, backgroundColor: 'red' }}></View>
    //     <View style={{ height: 100, width: 100, backgroundColor: 'green' }}></View>
    //     <View style={{ height: 100, width: 100, backgroundColor: 'blue' }}></View>
    //     {/* needed to show 'stretch' */}
    //     <View style={{ height: 100, backgroundColor: 'yellow' }}></View>
    //   </View>
    // );

    // -05- alignSelf  can be used to position the child nodes along the cross axis, for each child
    //  return (
    //     <View style={{ flex: 1, flexDirection: 'column' }}>
    //       <View style={{ alignSelf: 'flex-start', height: 100, width: 100, backgroundColor: 'red' }}></View>
    //       <View style={{ alignSelf: 'center', height: 100, width: 100, backgroundColor: 'green' }}></View>
    //       <View style={{ alignSelf: 'flex-end', height: 100, width: 100, backgroundColor: 'blue' }}></View>
    //       <View style={{ alignSelf: 'stretch', height: 100, backgroundColor: 'yellow' }}></View>
    //     </View>
    //   );

    // -06- relative can move a node relative to the position in the 'normal' layout
    // return (
    //   <View style={{ flex: 1, flexDirection: 'column' }}>
    //     <View style={{ position: 'relative', top: 20, left: 20, height: 100, width: 100, backgroundColor: 'red' }}></View>
    //     <View style={{ position: 'relative', top: 40, left: 40, height: 100, width: 100, backgroundColor: 'green' }}></View>
    //     <View style={{ position: 'relative', top: 60, left: 60, height: 100, width: 100, backgroundColor: 'blue' }}></View>
    //   </View>
    // );

    // -07- absolute positions elements absolutely
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ position: 'absolute', top: 20, left: 20, height: 100, width: 100, backgroundColor: 'red' }}></View>
        <View style={{ position: 'absolute', top: 40, left: 40, height: 100, width: 100, backgroundColor: 'green' }}></View>
        <View style={{ position: 'absolute', top: 60, left: 60, height: 100, width: 100, backgroundColor: 'blue' }}></View>
      </View>
    );

  }
}