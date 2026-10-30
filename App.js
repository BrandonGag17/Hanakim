import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// Cambia este valor por el código que quieras entregar a tus usuarios.
const ACCESS_CODE = '53343';
const logo = require('./assets/logo-4.png');

export default function App() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('idle');

  const checkCode = () => {
    setStatus(code.trim().toUpperCase() === ACCESS_CODE ? 'success' : 'error');
  };

  const tryAgain = () => {
    setCode('');
    setStatus('idle');
  };

  const isSuccess = status === 'success';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#9BE8FF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.screen}
      >
        <View style={styles.blobTop} />
        <View style={styles.blobBottom} />

        <View style={styles.header}>
          <View style={styles.brandMark}><Text style={styles.brandPlay}>▶</Text></View>
          <Text style={styles.brand}>Misión Hanakim</Text>
        </View>

        <View style={styles.content}>
          {isSuccess ? (
            <View style={styles.successCard}>
              <View style={styles.confettiRow}>
                <Text style={styles.confetti}>✦</Text><Text style={styles.confetti}>●</Text><Text style={styles.confetti}>✦</Text>
              </View>
              <View style={styles.successLogoWrap}>
                <Image source={logo} style={styles.successLogo} resizeMode="contain" />
              </View>
              <Text style={styles.successTitle}>¡LO LOGRASTE!</Text>
              <Text style={styles.successMessage}>
                EL VIDEO SE HA COMPLETADO:{'\n'}VERIFICA TUS MENSAJES
              </Text>
              <Text style={styles.successHint}>Tu próxima sorpresa ya está en camino.</Text>
              <Pressable style={styles.secondaryButton} onPress={tryAgain}>
                <Text style={styles.secondaryButtonText}>INGRESAR OTRO CÓDIGO</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <Image source={logo} style={styles.heroLogo} resizeMode="contain" />
              <Text style={styles.title}>Ingresa el código para desbloquear el video</Text>
              <Text style={styles.subtitle}>hacia Eudamon...</Text>

              <View style={styles.formCard}>
                <Text style={styles.inputLabel}>CÓDIGO DE ACCESO</Text>
                <TextInput
                  value={code}
                  onChangeText={(value) => { setCode(value); setStatus('idle'); }}
                  onSubmitEditing={checkCode}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  placeholder="Escribe aquí..."
                  placeholderTextColor="#98A1B8"
                  style={[styles.input, status === 'error' && styles.inputError]}
                  returnKeyType="done"
                />
                {status === 'error' && <Text style={styles.errorText}>Ups, ese código no es correcto. ¡Inténtalo otra vez!</Text>}
                <Pressable style={styles.primaryButton} onPress={checkCode}>
                  <Text style={styles.primaryButtonText}>¡DESBLOQUEAR! ✨</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#9BE8FF' },
  screen: { flex: 1, backgroundColor: '#9BE8FF', overflow: 'hidden', paddingHorizontal: 24 },
  blobTop: { position: 'absolute', width: 280, height: 280, borderRadius: 140, backgroundColor: '#BCA7FF', top: -145, right: -65, opacity: 0.8 },
  blobBottom: { position: 'absolute', width: 230, height: 230, borderRadius: 115, backgroundColor: '#FFA64D', bottom: -120, left: -75, opacity: 0.95 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 16, gap: 9 },
  brandMark: { width: 34, height: 34, borderRadius: 11, backgroundColor: '#7146D9', alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '-8deg' }] },
  brandPlay: { color: '#fff', fontSize: 16, marginLeft: 2 },
  brand: { color: '#39246D', fontSize: 18, fontWeight: '800', letterSpacing: -0.4 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', maxWidth: 420, alignSelf: 'center', width: '100%' },
  heroLogo: { width: 132, height: 132, marginBottom: 5 },
  title: { textAlign: 'center', fontSize: 37, lineHeight: 39, letterSpacing: -1.5, fontWeight: '900', color: '#352064' },
  subtitle: { color: '#4C5480', textAlign: 'center', fontSize: 16, lineHeight: 22, marginTop: 14, marginBottom: 28, paddingHorizontal: 14 },
  formCard: { backgroundColor: '#fff', width: '100%', padding: 22, borderRadius: 27, shadowColor: '#473271', shadowOpacity: 0.15, shadowRadius: 16, shadowOffset: { width: 0, height: 7 }, elevation: 5 },
  inputLabel: { fontSize: 12, color: '#614C93', fontWeight: '900', letterSpacing: 1.1, marginBottom: 9 },
  input: { height: 56, borderWidth: 2, borderColor: '#D9D4ED', backgroundColor: '#F7F5FE', borderRadius: 15, paddingHorizontal: 16, fontSize: 18, color: '#39246D', fontWeight: '700', letterSpacing: 1 },
  inputError: { borderColor: '#F06071', backgroundColor: '#FFF3F4' },
  errorText: { color: '#D34158', fontSize: 12, fontWeight: '600', marginTop: 8, lineHeight: 16 },
  primaryButton: { marginTop: 17, backgroundColor: '#7146D9', height: 57, borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#4D269F', shadowOpacity: 0.28, shadowRadius: 0, shadowOffset: { width: 0, height: 5 }, elevation: 3 },
  primaryButtonText: { color: '#fff', fontWeight: '900', fontSize: 15, letterSpacing: 0.6 },
  successCard: { backgroundColor: '#fff', borderRadius: 30, paddingVertical: 31, paddingHorizontal: 23, width: '100%', alignItems: 'center', shadowColor: '#473271', shadowOpacity: 0.16, shadowRadius: 17, shadowOffset: { width: 0, height: 8 }, elevation: 5 },
  confettiRow: { position: 'absolute', flexDirection: 'row', width: '88%', top: 15, justifyContent: 'space-between' },
  confetti: { fontSize: 23, color: '#FF9635' },
  successLogoWrap: { width: 108, height: 108, borderRadius: 54, backgroundColor: '#BCA7FF', alignItems: 'center', justifyContent: 'center', marginTop: 9 },
  successLogo: { width: 94, height: 94 },
  successTitle: { color: '#7146D9', fontSize: 27, fontWeight: '900', marginTop: 17, letterSpacing: 0.2 },
  successMessage: { color: '#362166', textAlign: 'center', fontSize: 19, lineHeight: 25, fontWeight: '900', marginTop: 12 },
  successHint: { color: '#657096', textAlign: 'center', fontSize: 14, marginTop: 13, marginBottom: 24 },
  secondaryButton: { borderWidth: 2, borderColor: '#7146D9', height: 48, paddingHorizontal: 19, borderRadius: 14, justifyContent: 'center' },
  secondaryButtonText: { color: '#7146D9', fontWeight: '900', fontSize: 12, letterSpacing: 0.45 },
  footer: { color: '#4C5480', textAlign: 'center', fontWeight: '700', fontSize: 12, marginBottom: 18, opacity: 0.8 },
});
