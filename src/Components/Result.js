import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const widthDevice = Math.round(Dimensions.get('window').width)

const dataItemRender = (itemData = null, language = 'en', i) => {
  return itemData !== null ? (
    <View style={styles.bottomContainer} key={String(i)}>
      {itemData.title ? (
        <Text style={[styles.textContainer, styles.textTitleContainer]}>
          {language === 'en' ? itemData.title.en : itemData.title.vi}
        </Text>
      ) : null}

      {itemData.data !== undefined
        ? itemData.data.map((item, i) => {
            return (
              <Text style={[styles.textDesContainer]} key={String(i)}>
                {language === 'en' ? item.valueEN : item.valueVI}
              </Text>
            );
          })
        : null}
      {itemData.valueEN !== undefined && itemData.valueVI !== undefined ? (
        <Text style={styles.textDesContainer}>
          {language === 'en' ? itemData.valueEN : itemData.valueVI}
        </Text>
      ) : null}
    </View>
  ) : null;
};

const dataSpecialItemRender = (itemData = null, language = 'en', i) => {
  return itemData !== null ? (
    <View style={styles.bottomSpecialContainer} key={String(i)}>
      {itemData.title ? (
        <Text style={[styles.textContainer, styles.textTitleContainer]}>
          {language === 'en' ? itemData.title.en : itemData.title.vi}
        </Text>
      ) : null}

      {itemData.data !== undefined
        ? language === 'en'
          ? itemData.data.en.map((item, i) => {
              return <Text style={[styles.textDesContainer, itemData.title.en == '' ? {marginTop: widthDevice * 0.04} : {}]} key={String(i)}>{item}</Text>;
            })
          : itemData.data.vi.map((item, i) => {
              return <Text style={styles.textDesContainer} key={String(i)}>{item}</Text>;
            })
        : null}
    </View>
  ) : null;
};

const LotsOfGreetings = (props) => {
  const {dataTransfer, language, special = false} = props;
  // console.log('dataTransfer1111', dataTransfer);
  // console.log('language', language, dataTransfer.title.en);
  return dataTransfer !== undefined ? (
    <View style={[styles.center, styles.containerData]}>
      <View style={styles.subContainer}>
        <LinearGradient
          start={{x: 0.5, y: 0.5}}
          end={{x: 1, y: 1}}
          locations={[0, 1]}
          colors={['#FF9DB8', '#FAFAFA']}
          style={styles.subContainer1}>
          <Text style={styles.subContainer2}>
            {language === 'en' ? dataTransfer.title.en : dataTransfer.title.vi}
          </Text>
        </LinearGradient>
        {dataTransfer.data !== null
          ? special
            ? dataTransfer.data.map((item, i) => {
                return (
                  <View
                    style={{
                      borderColor: 'red',
                      width: '100%',
                      borderBottomWidth: 1,
                      marginTop : 10
                    }}
                    key={String(i)}
                    >
                    {item.map((it1, i1) => {
                      return dataSpecialItemRender(it1, language, i1);
                    })}
                  </View>
                );
              })
            : 
            <View
            style={{
              borderColor: 'red',
              width: '100%',
              borderBottomWidth: 1,
              marginTop : 10
            }}
            >
              {
                dataTransfer.data.map((item, i) => {
                  return dataItemRender(item, language, i);
                })
              }
            </View>
          : null}
      </View>
    </View>
  ) : null;
};

// Later on in your styles..
var styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    fontSize: widthDevice * 0.04
  },
  containerData: {
    top: 50,
    bottom: 40,
    fontSize: widthDevice * 0.04
  },
  textContainer: {
    padding: 10,
    fontSize: widthDevice * 0.04,
    // marginTop: widthDevice * 0.04
  },
  textTitleContainer: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: widthDevice * 0.04,
    // marginTop: widthDevice * 0.04
  },
  textDesContainer: {
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: widthDevice * 0.04,
  },
  subContainer: {
    margin: 40,
    padding: 40,
    backgroundColor: 'transparent',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: widthDevice * 0.04,
    paddingTop: widthDevice * 0.04,
  },
  bottomContainer: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    width: '100%',
    // alignContent: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    fontSize: widthDevice * 0.04
    // alignItems: 'center',
  },
  bottomSpecialContainer: {
    // borderBottomWidth: 1,
    // borderColor: 'gray',
    width: '100%',
    // alignContent: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    fontSize: widthDevice * 0.04
    // alignItems: 'center',
  },
  subContainer1: {
    paddingHorizontal: 20,
    marginLeft: 4,
    position: 'absolute',
    top: -15,
    left: 5,
    borderRadius: 5,
    fontSize: widthDevice * 0.04
  },
  subContainer2: {
    // fontSize: 14,
    textAlign: 'center',
    margin: 5,
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontSize: widthDevice * 0.04
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    fontSize: widthDevice * 0.04
  },
  buttonText: {
    fontSize: widthDevice * 0.05,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default LotsOfGreetings;
