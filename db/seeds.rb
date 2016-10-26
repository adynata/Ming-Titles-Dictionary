# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'csv'

root_user = User.new(is_admin: true, super_admin: true, approved: true, email: "clwoods@uci.edu", fname: "Claire", lname: "Woods", password: "Password123")
root_user.save!

author = User.new(is_admin: true, super_admin: false, approved: true, email: "no-reply@uci.edu", fname: "Charles", lname: "Hucker", password: "Hucker1985")
author.save!

csv_text = File.read(Rails.root.join('lib', 'seeds', 'official_titles_sorted-10-24-2016.cvs'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
# add in institutions, check for any new
csv.each do |row|

  inst1 = row["Institution 1"].gsub(/\s+/, "")
  rank1 = row["Institution 1"]

  inst2 = row["Institution 2"].gsub(/\s+/, "")
  rank2 = row["Institution 2"]

  inst3 = row["Institution 3"].gsub(/\s+/, "")
  rank3 = row["Institution 3"]

  inst1 = Institution.find_by_name(inst1) || Institution.create(name: inst1)

  if !!inst2
    inst2 = Institution.find_by_name(inst2) || Institution.create(name: inst2, parent: inst1)
  end

  if !!inst3
    inst3 = Institution.find_by_name(inst3) || Institution.create(name: inst3, parent: inst2)
  end


end

# add in titles, and add titles to institutions and institutions to titles
csv.each do |row|
  t = Title.new
  t.pinyin_title = row["official_pinyin"]
  t.chinese_title = row["official_Chinese"]
  t.save!
  if row["official_translation"]
    trans = Translation.new(translation_text: row["official_translation"],
                        user_id: author.id,
                        title_id: t.id,
                        approved: true)
    trans.save!
    trans.comment_added_at = trans.created_at
    trans.save!
  end
  institution_ids = [
    row["Institution 1"], row["Institution 2"], row["Institution 3"]
  ]
  institution_ids.each do |inst|
    institution = Institution.find_by_name(inst)
    if institution
      relation = InstitutionsAndTitle.new(
        institution_id: institution.id,
        title_id: t.id
      )
      relation.save!
    end
  end
end
