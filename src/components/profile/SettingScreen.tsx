import { useAuth } from '@/hooks/auth';
import HeaderTemplate from '@/templates/HeaderTemplate';

function SettingScreen() {
  const { logout } = useAuth();
  return (
    <HeaderTemplate title="Settings" hasFooter={false}>
      <section className="flex flex-col">
        <button onClick={logout} type="button" className="clearButton">
          <p>Logout</p>
        </button>
      </section>
    </HeaderTemplate>
  );
}

export default SettingScreen;
