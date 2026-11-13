import { test, expect } from "@playwright/test";
import { TestHelper } from "./_models/testHelper";
import { monthData } from "@/_global/lib/shared";

test.describe('Header コンポーネントのナビゲーションテスト', () => {
	let helper: Readonly<TestHelper>;

	test.beforeEach(async ({ page, baseURL }) => {
		helper = new TestHelper(page, baseURL);
		await helper.init();
	});

	const month = new Date().getMonth() + 1;
	const monthString = Object.keys(monthData)[month];

	test('Typesリンクをクリックしたとき、正常にパスが切り替わり active クラスが付与されるか', async ({ page }) => {
		await expect(page).toHaveURL(helper.baseURL);
		const homeLink = page.getByTestId('btn-header-home');
		const typesLink = page.getByTestId('btn-header-types');

		await test.step('最初は "Home" に active クラスがついていることを確認', async () => {
			await expect(homeLink).toContainClass('active');
		});

		await test.step('"Types" リンクに active クラスが付き、"Home" から外れたかを確認', async () => {
			await typesLink.click();
			await expect(homeLink).not.toContainClass('active');
			await expect(typesLink).toContainClass('active');
		});
	});
});
