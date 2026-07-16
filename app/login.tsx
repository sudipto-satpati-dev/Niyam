import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // In a real app, you'd handle authentication here
    router.replace('/(tabs)');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleForgotPassword = () => {
    // Handle forgot password
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      {/* Background Decorative Elements - matching the HTML and welcome pages */}
      <View style={[styles.bgBlob, styles.bgBlobTopLeft]} />
      <View style={[styles.bgBlob, styles.bgBlobBottomRight]} />

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top + 20, 60), paddingBottom: Math.max(insets.bottom, 24) }
        ]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Image
            source={require('@/assets/Logos/primary-logo.png')}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        {/* Headline */}
        <View style={styles.headerText}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Return to your path of modern wisdom.</Text>
        </View>

        {/* Login Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="vaidya@niyam.com"
              placeholderTextColor="rgba(63, 73, 65, 0.4)"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="rgba(63, 73, 65, 0.4)"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <Pressable onPress={handleForgotPassword} style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </Pressable>
          </View>

          <Pressable
            style={({ pressed }) => [styles.loginButton, pressed && styles.buttonPressed]}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>
        </View>

        {/* Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Logins */}
        <View style={styles.socialContainer}>
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

        {/* Footer Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Pressable onPress={handleSignUp}>
            <Text style={styles.signUpText}>Sign up</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Subtle Texture Overlay (Optional, but gives premium feel) */}
      <View style={styles.textureOverlay} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    alignItems: 'center',
    zIndex: 10,
  },
  bgBlob: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.05,
  },
  bgBlobTopLeft: {
    top: -100,
    left: -100,
    backgroundColor: '#1d6f42',
  },
  bgBlobBottomRight: {
    bottom: -100,
    right: -100,
    backgroundColor: '#5c51b0',
  },
  logoSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
  },
  headerText: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Fraunces-Bold',
    fontSize: 36,
    color: '#00552e', // Deep Forest Green from project colors
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: 'rgba(63, 73, 65, 0.7)',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    gap: 20,
  },
  inputGroup: {
    width: '100%',
  },
  label: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#3f4941',
    letterSpacing: 2,
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    width: '100%',
    height: 56,
    backgroundColor: '#eeeeec',
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#1a1c1b',
    fontFamily: 'DM-Sans',
  },
  passwordContainer: {
    position: 'relative',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 13,
    color: '#885200', // secondary color from HTML
    fontWeight: 'bold',
  },
  loginButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#1d6f42',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1a1c1b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontFamily: 'DM-Sans-Bold',
    fontSize: 18,
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
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(111, 122, 112, 0.2)',
  },
  dividerText: {
    fontFamily: 'DM-Sans-Medium',
    fontSize: 10,
    color: 'rgba(63, 73, 65, 0.5)',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  socialContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: '#f4f4f2',
    borderRadius: 999, // full round as per HTML
    gap: 12,
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  socialButtonText: {
    fontFamily: 'DM-Sans-SemiBold',
    fontSize: 15,
    color: '#1a1c1b',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
    marginBottom: 20,
  },
  footerText: {
    fontFamily: 'DM-Sans',
    fontSize: 14,
    color: 'rgba(63, 73, 65, 0.8)',
  },
  signUpText: {
    fontFamily: 'DM-Sans-Bold',
    fontSize: 14,
    color: '#00552e',
    fontWeight: 'bold',
  },
  textureOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    opacity: 0.03,
    zIndex: 1,
  }
});
