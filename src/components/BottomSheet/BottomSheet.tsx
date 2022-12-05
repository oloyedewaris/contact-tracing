import React, { forwardRef } from "react";
import { SafeAreaView } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import RBSheet from "react-native-raw-bottom-sheet";

const BottomSheet = forwardRef(({ children, height }, ref) => {
  return (
    <RBSheet
      ref={ref}
      closeOnDragDown={true}
      closeOnPressMask={true}
      animationType="fade"
      height={height ? height : moderateScale(320)}
      customStyles={{
        wrapper: { backgroundColor: 'rgba(0, 0, 0, 0.2)' },
        container: {
          backgroundColor: "#fff",
          borderTopRightRadius: moderateScale(20),
          borderTopLeftRadius: moderateScale(20)
        },
        draggableIcon: { backgroundColor: "#000" }
      }}>
      <SafeAreaView style={{ justifyContent: 'center', height: '100%' }}>
        {children}
      </SafeAreaView>
    </RBSheet>
  );
})

export default BottomSheet;