import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

export default function SignupScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Navigate to OTP Verification
    router.replace('/otp-verify');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Background Decorative Elements */}
      <View style={[styles.bgBlob, styles.bgBlobTopRight]} />
      <View style={[styles.bgBlob, styles.bgBlobBottomLeft]} />

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent, 
          { paddingTop: Math.max(insets.top + 20, 40), paddingBottom: Math.max(insets.bottom, 24) }
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Brand Identity */}
        <View style={styles.brandHeader}>
          <Image
            source={require('@/assets/Logos/primary-logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
          <Text style={styles.headerTitle}>Create your account</Text>
          <Text style={styles.headerSubtitle}>Begin your journey to conscious well-being.</Text>
        </View>

        {/* Registration Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>FULL NAME</Text>
            <TextInput
              style={styles.input}
              placeholder="Vaidya Sharma"
              placeholderTextColor="rgba(63, 73, 65, 0.4)"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="name@example.com"
              placeholderTextColor="rgba(63, 73, 65, 0.4)"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="rgba(63, 73, 65, 0.4)"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Pressable 
            style={({ pressed }) => [styles.signupButton, pressed && styles.buttonPressed]}
            onPress={handleSignup}
          >
            <Text style={styles.signupButtonText}>Create Account</Text>
          </Pressable>
        </View>

        {/* Social Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR SIGN UP WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Buttons (Grid) */}
        <View style={styles.socialGrid}>
          <Pressable style={styles.socialButton}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzZewXj2Q_BKXXi0Ui3iZOsfyc7V4yVn04o3NJQIT-_HcmmOo-cMdkVLGmVB2RufxEgpObRJpjNEVrNBDEY2Fyd97uadeSaeFqhtS-_3D8CzH6FaHfonv_UwwVWahMAhINx4aaAhGheyDUruiE_S5PNZlWhu5LuVPkPsZIFMlBjZqkKD-gTudp1Hiy2MV11q9yVbA7yWLhfSSMOicIQwRyIxRvsvZfgd-cXVaDbbCPfT2KqID85M3qg9qkyl0NZt2gFrItQI7Bcjfy' }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Google</Text>
          </Pressable>

          <Pressable style={styles.socialButton}>
            <MaterialIcons name="apple" size={24} color="#1a1c1b" />
            <Text style={styles.socialButtonText}>Apple</Text>
          </Pressable>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLoginRow}>
            <Text style={styles.footerLoginText}>Already have an account? </Text>
            <Pressable onPress={handleLogin}>
              <Text style={styles.loginLinkText}>Login</Text>
            </Pressable>
          </View>
          
          <View style={styles.legalNoticeContainer}>
            <Text style={styles.legalNoticeText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.underline}>Terms of Service</Text> and{' '}
              <Text style={styles.underline}>Privacy Policy</Text>. Niyam uses ritual-based data to personalize your healing journey.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Background Decorative Blur Blobs */}
      <View style={styles.blurBlob1} pointerEvents="none" />
      <View style={styles.blurBlob2} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7', // background color from HTML
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center', // Center content if it fits
    zIndex: 10,
  },
  bgBlob: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    opacity: 0.03,
  },
  bgBlobTopRight: {
    top: -100,
    right: -100,
    backgroundColor: '#1d6f42',
  },
  bgBlobBottomLeft: {
    bottom: -100,
    left: -100,
    backgroundColor: '#885200',
  },
  brandHeader: {
    marginBottom: 32,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 32,
    color: '#1a1c1b',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 15,
    color: '#3f4941',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
  form: {
    width: '100%',
    gap: 16,
  },
  inputGroup: {
    width: '100%',
    gap: 6,
  },
  label: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#3f4941',
    letterSpacing: 2,
    marginLeft: 4,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#eeeeec', // surface-container from HTML
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 15,
    color: '#1a1c1b',
    fontFamily: 'DM-Sans',
  },
  signupButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1d6f42',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginTop: 16,
  },
  signupButtonText: {
    color: '#ffffff',
    fontFamily: 'DM-Sans-Bold',
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 40,
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: 'rgba(63, 73, 65, 0.2)',
  },
  dividerText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 9,
    color: 'rgba(63, 73, 65, 0.6)',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  socialGrid: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
    marginBottom: 40,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 52,
    backgroundColor: '#f4f4f2',
    borderRadius: 8,
    gap: 8,
  },
  socialIcon: {
    width: 18,
    height: 18,
  },
  socialButtonText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 14,
    color: '#1a1c1b',
    fontWeight: '600',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    gap: 32,
  },
  footerLoginRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLoginText: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: '#3f4941',
  },
  loginLinkText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#1d6f42',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  legalNoticeContainer: {
    paddingHorizontal: 8,
  },
  legalNoticeText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 11,
    lineHeight: 16,
    color: 'rgba(63, 73, 65, 0.4)',
    textAlign: 'center',
    fontWeight: '500',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  blurBlob1: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(29, 111, 66, 0.05)',
    borderRadius: 100,
  },
  blurBlob2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 200,
    height: 200,
    backgroundColor: 'rgba(136, 82, 0, 0.05)',
    borderRadius: 100,
  }
});
