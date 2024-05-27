// Componente de Card de Perfil
const ProfileCard = ({ profile }) => {
    return (
        <div className="border rounded-lg p-4 m-2 bg-white">
            <h2 className="text-lg font-semibold">{profile.nome}</h2>
            <p><strong>ID:</strong> {profile._id}</p>
            <p><strong>Gêneros Preferidos:</strong> {profile.generosPreferidos.join(', ') || 'Nenhum gênero selecionado'}</p>
            <p><strong>Filmes Favoritados:</strong> {profile.filmesFavoritados.length > 0 ? profile.filmesFavoritados.map(favorito => favorito.titulo).join(', ') : 'Nenhum filme favoritado'}</p>
        </div>
    );
};
