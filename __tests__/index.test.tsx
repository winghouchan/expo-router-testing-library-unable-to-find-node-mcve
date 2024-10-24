import { screen, render, userEvent } from '@testing-library/react-native';
import { Link } from 'expo-router';
import { renderRouter } from 'expo-router/testing-library';
import { Text, View } from 'react-native';

function Index() {
  return (
    <View>
      <Link href="/foo">Link</Link>
    </View>
  );
}

function Foo() {
  return (
    <View>
      <Text>Foo</Text>
    </View>
  );
}

/**
 * This test case is expected to fail because no router has been mounted
 */
test("Fails: TypeError: Cannot read properties of undefined (reading 'isReady')", async () => {
  const user = userEvent.setup();

  render(<Index />, { wrapper: ({ children }) => <View>{children}</View> });

  await user.press(screen.getByRole('link'));

  expect(screen).toHavePathname('/foo');
});

/**
 * This test case is the same as above but using `renderRouter` from `expo-router/testing-library`.
 * It should not fail. However it fails as the link cannot be pressed due to the following error:
 *
 * > Unable to find node on an unmounted component.
 */
test('Fails: Unable to find node on an unmounted component.', async () => {
  const user = userEvent.setup();

  renderRouter({
    index: Index,
    '/foo': Foo,
  });

  await user.press(screen.getByRole('link'));

  expect(screen).toHavePathname('/foo');
});
