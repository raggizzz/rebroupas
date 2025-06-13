import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { User } from '../types/product';

export class AuthService {
  // Registrar novo usuário no sistema
  static async register(email: string, password: string, displayName?: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Atualizar perfil com nome de exibição do usuário
      if (displayName) {
        await updateProfile(firebaseUser, { displayName });
      }
      
      // Criar documento do usuário no Firestore para persistência
      const userData: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: displayName || firebaseUser.displayName || '',
        photoURL: firebaseUser.photoURL || '',
        created_at: new Date(),
        updated_at: new Date()
      };
      
      await setDoc(doc(db, 'users', firebaseUser.uid), userData);
      
      return userData;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      throw error;
    }
  }
  
  // Fazer login do usuário no sistema
  static async login(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      // Buscar dados do usuário armazenados no Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (userDoc.exists()) {
        return {
          id: userDoc.id,
          ...userDoc.data()
        } as User;
      } else {
        // Se não existir documento, criar um novo
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email!,
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || '',
          created_at: new Date(),
          updated_at: new Date()
        };
        
        await setDoc(doc(db, 'users', firebaseUser.uid), userData);
        return userData;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }
  
  // Fazer logout do usuário
  static async logout(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  }

  // Observar mudanças no estado de autenticação em tempo real
  static onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Buscar dados completos do usuário no banco
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = {
              id: userDoc.id,
              ...userDoc.data()
            } as User;
            callback(userData);
          } else {
            // Criar documento se não existir no banco
            const userData: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              displayName: firebaseUser.displayName || '',
              photoURL: firebaseUser.photoURL || '',
              created_at: new Date(),
              updated_at: new Date()
            };
            
            await setDoc(doc(db, 'users', firebaseUser.uid), userData);
            callback(userData);
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }
  
  // Obter usuário atualmente logado
  static getCurrentUser(): FirebaseUser | null {
    return auth.currentUser;
  }
  
  // Verificar se usuário está logado
  static isAuthenticated(): boolean {
    return !!auth.currentUser;
  }
}

export default AuthService;