# == Schema Information
#
# Table name: translations
#
#  id          :integer          not null, primary key
#  translation :string           not null
#  title_id    :integer          not null
#  user_id     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class TranslationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end