import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Animated, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

export default function OtpVerificationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [code, setCode] = useState(['1', '2', '3', '4', '5', '6']); // Default value as requested
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  
  const inputRefs = useRef<Array<TextInput | null>>([]);
  
  // Animation values
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const successScale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Initialize refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  const handleCodeChange = (text: string, index: number) => {
    if (status !== 'idle' && status !== 'error') return;
    
    // Reset error state on type
    if (status === 'error') {
      setStatus('idle');
    }

    const newCode = [...code];
    newCode[index] = text.substring(text.length - 1); // Only take last character
    setCode(newCode);

    // Auto advance
    if (text !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const triggerErrorAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true })
    ]).start();
  };

  const triggerSuccessAnimation = () => {
    Animated.sequence([
      Animated.timing(successScale, { toValue: 1.1, duration: 150, useNativeDriver: true }),
      Animated.timing(successScale, { toValue: 1, duration: 150, useNativeDriver: true }),
      // Fade out for transition
      Animated.timing(fadeAnim, { toValue: 0, duration: 300, delay: 500, useNativeDriver: true })
    ]).start(() => {
      // Transition to next screen
      router.replace('/choose-plan');
    });
  };

  const handleVerify = () => {
    const fullCode = code.join('');
    if (fullCode.length < 6) return;
    
    setStatus('verifying');
    
    // Simulate network request
    setTimeout(() => {
      if (fullCode === '123456') {
        setStatus('success');
        triggerSuccessAnimation();
      } else {
        setStatus('error');
        triggerErrorAnimation();
      }
    }, 1500);
  };

  // Development helper to easily test both states
  const toggleTestValue = () => {
    setStatus('idle');
    if (code.join('') === '123456') {
      setCode(['1', '1', '1', '1', '1', '1']); // Creates error scenario
    } else {
      setCode(['1', '2', '3', '4', '5', '6']); // Creates success scenario
    }
  };

  const getInputStyle = (index: number) => {
    if (status === 'error') return [styles.inputField, styles.inputError];
    if (status === 'success') return [styles.inputField, styles.inputSuccess];
    if (focusedIndex === index) return [styles.inputField, styles.inputFocused];
    if (code[index] !== '') return [styles.inputField, styles.inputFilled];
    return styles.inputField;
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar style="dark" />
      
      {/* Background Decorative Elements */}
      <View style={[styles.bgBlob, styles.bgBlobTopLeft]} />
      <View style={[styles.bgBlob, styles.bgBlobBottomRight]} />

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingTop: Math.max(insets.top + 20, 40), paddingBottom: Math.max(insets.bottom, 24) }
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Back Button */}
        <Pressable 
          style={styles.backButton} 
          onPress={() => router.back()}
          disabled={status === 'verifying' || status === 'success'}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1a1c1b" />
        </Pressable>

        {/* Brand/Header */}
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="mark-email-read" size={32} color="#1d6f42" />
          </View>
          <Text style={styles.headerTitle}>Verify your email</Text>
          <Text style={styles.headerSubtitle}>
            We've sent a 6-digit verification code to
            <Text style={styles.boldText}> vaidya@niyam.com</Text>
          </Text>
        </View>

        {/* OTP Input Form */}
        <Animated.View 
          style={[
            styles.formContainer, 
            { transform: [{ translateX: shakeAnimation }, { scale: successScale }] }
          ]}
        >
          <View style={styles.otpContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={el => inputRefs.current[index] = el}
                style={getInputStyle(index)}
                value={digit}
                onChangeText={(text) => handleCodeChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(-1)}
                keyboardType="number-pad"
                maxLength={1}
                editable={status !== 'verifying' && status !== 'success'}
                selectTextOnFocus
              />
            ))}
          </View>

          {/* Status Message */}
          <View style={styles.statusContainer}>
            {status === 'error' && (
              <Text style={styles.errorText}>Invalid code. Please try again.</Text>
            )}
            {status === 'success' && (
              <Text style={styles.successText}>Verification successful!</Text>
            )}
          </View>

          {/* Verify Button */}
          <Pressable 
            style={({ pressed }) => [
              styles.verifyButton, 
              (pressed && status === 'idle') && styles.buttonPressed,
              (status === 'verifying' || code.join('').length < 6) && styles.buttonDisabled,
              status === 'success' && styles.buttonSuccess,
              status === 'error' && styles.buttonError
            ]}
            onPress={handleVerify}
            disabled={status === 'verifying' || status === 'success' || code.join('').length < 6}
          >
            {status === 'verifying' ? (
              <Text style={styles.verifyButtonText}>Verifying...</Text>
            ) : status === 'success' ? (
              <MaterialIcons name="check" size={28} color="#ffffff" />
            ) : (
              <Text style={styles.verifyButtonText}>Verify Account</Text>
            )}
          </Pressable>
        </Animated.View>

        {/* Resend Action */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code?</Text>
          <Pressable 
            onPress={toggleTestValue} // Using this to toggle test state for dev review
            disabled={status === 'verifying' || status === 'success'}
          >
            <Text style={[
              styles.resendLink,
              (status === 'verifying' || status === 'success') && { opacity: 0.5 }
            ]}>
              Click to resend
            </Text>
          </Pressable>
        </View>

      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    zIndex: 10,
  },
  bgBlob: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    opacity: 0.04,
  },
  bgBlobTopLeft: {
    top: -100,
    left: -100,
    backgroundColor: '#1d6f42',
  },
  bgBlobBottomRight: {
    bottom: -100,
    right: -100,
    backgroundColor: '#885200',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(238, 238, 236, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 48,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(29, 111, 66, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 32,
    color: '#1a1c1b',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  headerSubtitle: {
    fontFamily: 'DM-Sans',
    fontSize: 16,
    lineHeight: 24,
    color: '#3f4941',
    textAlign: 'center',
    maxWidth: '85%',
  },
  boldText: {
    fontFamily: 'DM-Sans-Bold',
    color: '#1a1c1b',
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },
  inputField: {
    width: 48,
    height: 64,
    backgroundColor: '#eeeeec',
    borderRadius: 16,
    fontFamily: 'DM-Sans-Bold',
    fontSize: 24,
    color: '#1a1c1b',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputFilled: {
    backgroundColor: 'rgba(29, 111, 66, 0.04)',
    borderColor: 'rgba(29, 111, 66, 0.2)',
  },
  inputFocused: {
    backgroundColor: '#ffffff',
    borderColor: '#1d6f42',
    shadowColor: '#1d6f42',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  inputError: {
    backgroundColor: 'rgba(186, 26, 26, 0.05)',
    borderColor: '#ba1a1a',
    color: '#ba1a1a',
  },
  inputSuccess: {
    backgroundColor: 'rgba(29, 111, 66, 0.1)',
    borderColor: '#1d6f42',
    color: '#1d6f42',
  },
  statusContainer: {
    height: 32,
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  errorText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#ba1a1a',
  },
  successText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 14,
    color: '#1d6f42',
  },
  verifyButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1d6f42',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1d6f42',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
    marginTop: 8,
  },
  verifyButtonText: {
    color: '#ffffff',
    fontFamily: 'DM-Sans-Bold',
    fontSize: 18,
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonDisabled: {
    backgroundColor: '#bfc9be',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonSuccess: {
    backgroundColor: '#1d6f42',
  },
  buttonError: {
    backgroundColor: '#ba1a1a',
    shadowColor: '#ba1a1a',
  },
  resendContainer: {
    marginTop: 48,
    alignItems: 'center',
    gap: 8,
  },
  resendText: {
    fontFamily: 'DM-Sans',
    fontSize: 15,
    color: '#3f4941',
  },
  resendLink: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 15,
    color: '#1d6f42',
    textDecorationLine: 'underline',
  },
});
