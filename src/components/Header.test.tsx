import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
    it('should render the logo with correct src', () => {
        render(<Header />);

        const logoImage = screen.getByAltText('logo');

        expect(logoImage).toHaveAttribute('src', expect.stringContaining('/_next/image?url=%2FLogo.png'));
    });
});
