require 'rails_helper'

RSpec.describe "memos/index", type: :view do
  feature "in the memos index screen," do
    scenario "When clicked New Memo, open the new memo screen" do
      # メモ一覧画面を開く
      visit memos_path

      # 'New Memo' (または設定されている翻訳) のリンクをクリック
      click_link (I18n.t 'memo.new') 

      # 遷移先のページに 'New Memo' という文字が含まれているか確認
      expect(page).to have_content (I18n.t 'memo.new')
    end
  end
end