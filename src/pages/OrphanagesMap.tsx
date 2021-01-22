import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import mapMarker from '../../src/images/map-marker.png';
import { useOrphanagesQuery } from '../generated/graphql';

const OrphanagesMap: React.FC = () => {
  
    const navigation = useNavigation();

    const {data, error, loading, refetch} = useOrphanagesQuery();
    
    navigation.addListener('focus', () => refetch())

    const handleNavigateToOrphanageDetails = useCallback((id : string) => {
      navigation.navigate('OrphanageDetails', {id});
    }, []);
  
    const handleNativateToCreateOrphanage = useCallback(() => {
      navigation.navigate('SelectMapPosition');
    },[]);

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

    return (
      <View style={styles.container}>
        <MapView 
          provider={PROVIDER_GOOGLE}
          zoomEnabled={true}
          zoomTapEnabled={true}
          zoomControlEnabled={true}
          style={styles.map} 
          initialRegion={{
            latitude: -33.7540892,
            longitude: 150.9927575,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
        }}>
          {data?.orphanages.map((orphanage) => (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude
              }}>
              <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name}</Text>
                  <Text style={styles.calloutDescription}>{orphanage.whatsapp}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
  
        <View style={styles.footer}>
          <Text style={styles.footerText}>{data?.orphanages.length} orphanages found.</Text>
  
          <RectButton style={styles.createOrphanageButton} onPress={handleNativateToCreateOrphanage}>
            <Feather name="plus" size={20} color="#FFF"/>
          </RectButton>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 190,
      height: 60,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
  
    calloutText: {
      color: '#0089a5',
      fontSize: 14,
      fontFamily: 'nunito700',
    },
    calloutDescription: {
      color: '#0089a5',
      fontSize: 12,
      fontFamily: 'nunito600',
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 46,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
    },
  
    footerText: {
      fontFamily: 'nunito700',
      color: '#8fa7b3'
    },
  
    createOrphanageButton: {
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export default OrphanagesMap;