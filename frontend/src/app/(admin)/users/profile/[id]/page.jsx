// src/app/users/profile/[id]/page.tsx
import ProfileClientPage from './ProfileClientPage';

export const metadata = {
    title: 'Perfil do Usuário | Equilibrium',
};

export default function ProfilePage(props) {
    return <ProfileClientPage />;
}
