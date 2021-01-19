import React, { useCallback } from 'react';
import { Image, View, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Feather, FontAwesome } from '@expo/vector-icons';
import mapMarkerImg from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, useFonts } from '@expo-google-fonts/nunito';
import { useFindOrphanageByIdQuery } from '../generated/graphql';


interface OrphanageDetailsRouteParams {
  id: string;
}

const OrphanageDetails: React.FC = () => {

  const route = useRoute();
  const params =route.params as OrphanageDetailsRouteParams;

  const { data, error, loading } = useFindOrphanageByIdQuery({
    variables: { id: params.id },
  });

  const handleOpenGoogleMap = useCallback(() => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${data?.findOrphanageById?.latitude},${data?.findOrphanageById?.longitude}`)
  }, []);

  const handleOpenWhatsApp = useCallback(() => {
    Linking.openURL(
      `whatsapp://send?text=Hi ${data?.findOrphanageById?.name}, I'd like to visit your Orphanage unit.`,
    );
  }, []);



  const [fontsLoaded] = useFonts({
    nunito600: Nunito_600SemiBold, 
    nunito700: Nunito_700Bold, 
    nunito800: Nunito_800ExtraBold
  });

  if (!fontsLoaded) {
    return null;
  }

  if (loading) {
    return <Text>Loading ...</Text>
  };

  if (error) {
    return <Text>Please try again: {error.name} | {error.message}</Text>
  };

  if (!data?.findOrphanageById?.latitude || !data?.findOrphanageById?.longitude) {
    return <Text>Latitude / Longitude missing.</Text>
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagesContainer}>
        <ScrollView horizontal pagingEnabled>
          <Image style={styles.image} source={require('../images/children.png')} />
          <Image style={styles.image} source={require('../images/help.png')} />
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{data?.findOrphanageById?.name}</Text>
        <Text style={styles.description}>Email:{data?.findOrphanageById?.email}</Text>
        <Text style={styles.description}>WhatsApp:{data?.findOrphanageById?.whatsapp}</Text>
        <Text style={styles.description}>About:{data?.findOrphanageById?.about}</Text>
      
        <View style={styles.mapContainer}>
          <MapView 
            initialRegion={{
              latitude: data.findOrphanageById.latitude,
              longitude: data.findOrphanageById.longitude,
              latitudeDelta: 0.008,
              longitudeDelta: 0.008,
            }} 
            zoomEnabled={false}
            pitchEnabled={false}
            scrollEnabled={false}
            rotateEnabled={false}
            style={styles.mapStyle}
          >
            <Marker 
              icon={mapMarkerImg}
              coordinate={{ 
                latitude: data?.findOrphanageById.latitude,
                longitude: data?.findOrphanageById.longitude,
              }}
            />
          </MapView>
          <TouchableOpacity onPress={handleOpenGoogleMap} style={styles.routesContainer}>
            <Text style={styles.routesText}>See the route in Google Maps</Text>
          </TouchableOpacity>
        </View>
      
        <View style={styles.separator} />

        <Text style={styles.title}>Visit Instructions</Text>
        <Text style={styles.description}>{data?.findOrphanageById.instructions}</Text>

        <View style={styles.scheduleContainer}>
          <View style={[styles.scheduleItem, styles.scheduleItemBlue]}>
            <Feather name="clock" size={40} color="#2AB5D1" />
            <Text style={[styles.scheduleText, styles.scheduleTextBlue]}>Opening hours: {`\n${data?.findOrphanageById.openingHours}`}</Text>
          </View>
          {data?.findOrphanageById?.openOnWeekends ? (
            <View style={[styles.scheduleItem, styles.scheduleItemGreen]}>
              <Feather name="info" size={40} color="#39CC83" />
              <Text style={[styles.scheduleText, styles.scheduleTextGreen]}>Open on Weekends</Text>
            </View>
              ) : (
            <View style={[styles.scheduleItem, styles.scheduleItemRed]}>
              <Feather name="info" size={40} color="#FF669D" />
              <Text style={[styles.scheduleText, styles.scheduleTextRed]}>Open only on Weekdays</Text>
            </View>
          )}

        </View>

        <RectButton style={styles.contactButton} onPress={handleOpenWhatsApp}>
          <FontAwesome name="whatsapp" size={24} color="#FFF" />
          <Text style={styles.contactButtonText}>Get in touch</Text>
        </RectButton>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imagesContainer: {
    height: 240,
  },

  image: {
    width: Dimensions.get('window').width,
    height: 240,
    resizeMode: 'cover',
  },

  detailsContainer: {
    padding: 24,
  },

  title: {
    color: '#4D6F80',
    fontSize: 30,
    fontFamily: 'nunito700',
  },

  description: {
    fontFamily: 'nunito600',
    color: '#5c8599',
    lineHeight: 24,
    marginTop: 16,
  },

  mapContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1.2,
    borderColor: '#B3DAE2',
    marginTop: 40,
    backgroundColor: '#E6F7FB',
  },

  mapStyle: {
    width: '100%',
    height: 150,
  },

  routesContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  routesText: {
    fontFamily: 'nunito700',
    color: '#000000'
  },

  separator: {
    height: 0.8,
    width: '100%',
    backgroundColor: '#D3E2E6',
    marginVertical: 40,
  },

  scheduleContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  scheduleItem: {
    width: '48%',
    padding: 20,
  },

  scheduleItemBlue: {
    backgroundColor: '#E6F7FB',
    borderWidth: 1,
    borderColor: '#B3DAE2',
    borderRadius: 20,
  },

  scheduleItemGreen: {
    backgroundColor: '#EDFFF6',
    borderWidth: 1,
    borderColor: '#A1E9C5',
    borderRadius: 20,
  },

  scheduleItemRed: {
    backgroundColor: '#FFE4EE',
    borderWidth: 1,
    borderColor: '#ffbcd4',
    borderRadius: 20,
  },

  scheduleText: {
    fontFamily: 'nunito600',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 20,
  },

  scheduleTextBlue: {
    color: '#5C8599'
  },

  scheduleTextGreen: {
    color: '#37C77F'
  },

  scheduleTextRed: {
    color: '#FF669D'
  },

  contactButton: {
    backgroundColor: '#3CDC8C',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 40,
  },

  contactButtonText: {
    fontFamily: 'nunito800',
    color: '#FFF',
    fontSize: 16,
    marginLeft: 16,
  }
})

export default OrphanageDetails;