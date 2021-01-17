import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, useFonts } from '@expo-google-fonts/nunito';
import { useCreateOrphanageMutation } from '../../generated/graphql';

interface OrphanageDataRouteParams {
  position: { latitude: number, longitude: number};
}

const OrphanageData: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [openingHours, setOpeningHours] = useState('');
  const [openOnWeekends, setOpenOnWeekends] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();

  const params = route.params as OrphanageDataRouteParams;
  
  const [createOrphanage, { loading, error }] = useCreateOrphanageMutation()

  async function handleCreateOrphanage() {

    const { latitude, longitude } = params.position;

    await createOrphanage({
      variables: {
        options: {
          name,
          email,
          whatsapp,
          latitude,
          longitude,
          about,
          instructions,
          openingHours,
          openOnWeekends,
        }
      }
    })

    navigation.navigate('OrphanageMap');
  }

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
    return <Text>Please try again: ${
      error.name + '\n' +
      error.message + '\n' +
      error.networkError + '\n' +
      error.graphQLErrors + '\n' +
      error.stack + '\n' +
      error.extraInfo + '\n'
    }</Text>
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Orphanage form</Text>

      <Text style={styles.label}>Name</Text>
      <Text style={styles.label}>{name}</Text>
      <TextInput
        style={styles.input}
        onChangeText={name => setName(name)}
        value={name}
      />


      <Text style={styles.label}>Email</Text>
      <Text style={styles.label}>{email}</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>WhatsApp</Text>
      <TextInput
        style={styles.input}
        value={whatsapp}
        onChangeText={setWhatsapp}
      />

      <Text style={styles.label}>About</Text>
      <TextInput
        style={[styles.input, { height: 300 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

      <Text style={styles.title}>Visitation</Text>

      <Text style={styles.label}>Instructions</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Opening Hours</Text>
      <TextInput
        style={styles.input}
        value={openingHours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Open On Weekends?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={openOnWeekends}
          onValueChange={setOpenOnWeekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Submit</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'nunito700',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'nunito600',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'nunito800',
    fontSize: 16,
    color: '#FFF',
  }
})

export default OrphanageData;