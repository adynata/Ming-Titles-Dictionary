class MyMailer < Devise::Mailer
  helper :application # gives access to all helpers defined within `application_helper`.
  # helper :devise # gives access to all helpers defined within `devise_helper`.
  #include Devise::Controllers # Optional. eg. `confirmation_url`
  include Devise::Mailers::Helpers
  default template_path: 'devise/mailer' # to make sure that your mailer uses the devise views
  #AC 10312016 default from: 'mingtitles@lib.uci.edu'
  default from: 'mingtitles@cygnus.lib.uci.edu'
  #AC 11012016 default from: 'devnull@cygnus.lib.uci.edu'
  #AC 11042016 default from: 'devnull@cygnus.lib.uci.edu'

  def greeting(id)
    @user = User.find_by_id(id)
    mail(to: @user.email, subject: 'Ming Government Official Titles: A Crowd-Translation Project')
  end

  def new_translation(user_id, translation_id)
    @user = User.find_by_id(user_id)
    @translation = Translation.find_by_id(translation_id)
    mail(to: @user.email, subject: 'New Translation Submitted')
  end

  def notify_superadmin_new_translation(translation_id)
    @users = User.where(super_admin: true)
    @translation = Translation.find_by_id(translation_id)
    @users.each { |u| mail(to: u.email, subject: 'New Translation Submitted') }
  end

  def notify_superadmin_new_scholar(id)
    @admin = User.find_by_id(1)
    @scholar =  User.find_by_id(id)
    mail(to: @admin.email, subject: 'New Scholar Application')
  end

  def acceptance(user)
    @user = user
    mail(to: @user.email, subject: 'Congratulations! You have been accepted as a contributing scholar.')
  end

  def assignment(message, translation_id, user_id)
    @translation = Translation.find(translation_id)
    @assignee = User.find(user_id)
    @message = message
    mail(to: @assignee.email, cc: current_user.email, subject: '#{@assignee.fname} #{@assignee.lname} - You have a new translation assignment (#{@translation.id.to_s})')
  end
end
