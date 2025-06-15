VERSION 4.00
Begin VB.Form Shop 
   Caption         =   "The Shop"
   ClientHeight    =   7635
   ClientLeft      =   1140
   ClientTop       =   1875
   ClientWidth     =   8310
   Height          =   8325
   Icon            =   "Shop.frx":0000
   Left            =   1080
   LinkTopic       =   "Form1"
   LockControls    =   -1  'True
   ScaleHeight     =   7635
   ScaleWidth      =   8310
   Top             =   1245
   Width           =   8430
   Begin VB.ComboBox ChassisBookFilter 
      Height          =   315
      ItemData        =   "Shop.frx":030A
      Left            =   1500
      List            =   "Shop.frx":030C
      Sorted          =   -1  'True
      Style           =   2  'Dropdown List
      TabIndex        =   101
      Tag             =   "*"
      Top             =   780
      Width           =   1215
   End
   Begin VB.HScrollBar M_LuxuryScroll 
      Enabled         =   0   'False
      Height          =   255
      LargeChange     =   10
      Left            =   5040
      Max             =   250
      Min             =   150
      SmallChange     =   10
      TabIndex        =   100
      Top             =   7020
      Value           =   200
      Width           =   435
   End
   Begin VB.TextBox M_Luxury 
      Alignment       =   1  'Right Justify
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Enabled         =   0   'False
      Height          =   255
      Left            =   5520
      Locked          =   -1  'True
      TabIndex        =   99
      Text            =   "1.5"
      Top             =   7020
      Width           =   375
   End
   Begin VB.CheckBox M_LuxuryC 
      Caption         =   "Luxury"
      Height          =   255
      Left            =   5940
      TabIndex        =   98
      Top             =   7020
      Width           =   1755
   End
   Begin VB.CheckBox M_NCVC 
      Caption         =   "Specialized (NCV)"
      Height          =   255
      Left            =   5940
      TabIndex        =   97
      Top             =   6420
      Width           =   1815
   End
   Begin VB.CheckBox M_UnusualC 
      Caption         =   "Unusual design/features"
      Height          =   255
      Left            =   5940
      TabIndex        =   96
      Top             =   6720
      Width           =   2115
   End
   Begin VB.CheckBox M_SpecialC 
      Caption         =   "Restricted (Security)"
      Height          =   255
      Left            =   5940
      TabIndex        =   95
      Top             =   7320
      Width           =   1755
   End
   Begin VB.TextBox M_Special 
      Alignment       =   1  'Right Justify
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Enabled         =   0   'False
      Height          =   255
      Left            =   5520
      Locked          =   -1  'True
      TabIndex        =   94
      Text            =   "2.0"
      Top             =   7320
      Width           =   375
   End
   Begin VB.HScrollBar M_SpecialScroll 
      Enabled         =   0   'False
      Height          =   255
      LargeChange     =   10
      Left            =   5040
      Max             =   500
      Min             =   200
      SmallChange     =   10
      TabIndex        =   93
      Top             =   7320
      Value           =   200
      Width           =   435
   End
   Begin VB.TextBox M_Unusual 
      Alignment       =   1  'Right Justify
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Enabled         =   0   'False
      Height          =   255
      Left            =   5520
      Locked          =   -1  'True
      TabIndex        =   92
      Text            =   "0.20"
      Top             =   6720
      Width           =   375
   End
   Begin VB.HScrollBar M_UnusualScroll 
      Enabled         =   0   'False
      Height          =   255
      LargeChange     =   20
      Left            =   5040
      Max             =   120
      Min             =   20
      SmallChange     =   20
      TabIndex        =   91
      Top             =   6720
      Value           =   20
      Width           =   435
   End
   Begin VB.TextBox M_NCV 
      Alignment       =   1  'Right Justify
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Enabled         =   0   'False
      Height          =   255
      Left            =   5520
      Locked          =   -1  'True
      TabIndex        =   90
      Text            =   "0.25"
      Top             =   6420
      Width           =   375
   End
   Begin VB.HScrollBar M_NCVscroll 
      Enabled         =   0   'False
      Height          =   255
      LargeChange     =   25
      Left            =   5040
      Max             =   250
      Min             =   25
      SmallChange     =   25
      TabIndex        =   89
      Top             =   6420
      Value           =   25
      Width           =   435
   End
   Begin VB.CheckBox M_AmbulanceC 
      Caption         =   "Ambulance"
      Height          =   255
      Left            =   5940
      TabIndex        =   88
      Top             =   6120
      Width           =   1275
   End
   Begin VB.TextBox CFLeft 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   7680
      Locked          =   -1  'True
      TabIndex        =   84
      Text            =   "0"
      Top             =   1980
      Width           =   555
   End
   Begin VB.TextBox LoadLeft 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   7680
      Locked          =   -1  'True
      TabIndex        =   83
      Text            =   "0"
      Top             =   2280
      Width           =   555
   End
   Begin VB.ComboBox ModBookFilter 
      Height          =   315
      ItemData        =   "Shop.frx":030E
      Left            =   2760
      List            =   "Shop.frx":0310
      Sorted          =   -1  'True
      Style           =   2  'Dropdown List
      TabIndex        =   82
      Tag             =   "*"
      Top             =   3600
      Width           =   1455
   End
   Begin VB.ListBox ExprList 
      Height          =   1815
      Left            =   9600
      TabIndex        =   81
      Top             =   5640
      Visible         =   0   'False
      Width           =   3255
   End
   Begin VB.TextBox Book 
      BackColor       =   &H8000000F&
      Height          =   285
      Left            =   1380
      Locked          =   -1  'True
      TabIndex        =   80
      Top             =   5760
      Width           =   1575
   End
   Begin VB.CheckBox Drone 
      Appearance      =   0  'Flat
      Caption         =   "Drone"
      Enabled         =   0   'False
      ForeColor       =   &H80000008&
      Height          =   255
      Left            =   60
      TabIndex        =   79
      Top             =   3000
      Width           =   795
   End
   Begin VB.CommandButton LevelDown 
      Caption         =   "-"
      BeginProperty Font {0BE35203-8F91-11CE-9DE3-00AA004BB851} 
         Name            =   "MS Sans Serif"
         Size            =   24
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   1395
      Left            =   4320
      TabIndex        =   78
      Top             =   6180
      Width           =   615
   End
   Begin VB.CommandButton LevelUp 
      Caption         =   "+"
      BeginProperty Font {0BE35203-8F91-11CE-9DE3-00AA004BB851} 
         Name            =   "MS Sans Serif"
         Size            =   24
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   1515
      Left            =   4320
      TabIndex        =   77
      Top             =   3960
      Width           =   615
   End
   Begin VB.CheckBox Military 
      Appearance      =   0  'Flat
      Caption         =   "Military"
      Enabled         =   0   'False
      ForeColor       =   &H80000008&
      Height          =   255
      Left            =   2760
      TabIndex        =   76
      Top             =   3000
      Width           =   795
   End
   Begin VB.CheckBox Security 
      Appearance      =   0  'Flat
      Caption         =   "Security"
      Enabled         =   0   'False
      ForeColor       =   &H80000008&
      Height          =   255
      Left            =   1380
      TabIndex        =   75
      Top             =   3000
      Width           =   915
   End
   Begin VB.CommandButton AboutButton 
      Caption         =   "&About"
      Height          =   315
      Left            =   10380
      TabIndex        =   74
      Top             =   960
      Visible         =   0   'False
      Width           =   855
   End
   Begin VB.TextBox TOL 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   5880
      Locked          =   -1  'True
      TabIndex        =   73
      Text            =   "N"
      Top             =   4800
      Width           =   975
   End
   Begin VB.ComboBox ModFilter 
      Height          =   315
      ItemData        =   "Shop.frx":0312
      Left            =   60
      List            =   "Shop.frx":0334
      Style           =   2  'Dropdown List
      TabIndex        =   72
      Top             =   3600
      Width           =   2655
   End
   Begin VB.CommandButton ClearButton 
      Caption         =   "&Clr"
      Height          =   255
      Left            =   11460
      TabIndex        =   71
      Top             =   480
      Visible         =   0   'False
      Width           =   495
   End
   Begin VB.TextBox Tare 
      Height          =   285
      Left            =   12000
      TabIndex        =   70
      Text            =   "Tare"
      Top             =   480
      Visible         =   0   'False
      Width           =   1035
   End
   Begin VB.CommandButton TareButton 
      Caption         =   "&Set"
      Height          =   315
      Left            =   11460
      TabIndex        =   68
      Top             =   120
      Visible         =   0   'False
      Width           =   495
   End
   Begin VB.TextBox CostY 
      Height          =   285
      Left            =   5880
      TabIndex        =   66
      Tag             =   "0"
      Text            =   "0"
      Top             =   660
      Width           =   1155
   End
   Begin VB.ComboBox Time 
      Height          =   315
      ItemData        =   "Shop.frx":03CA
      Left            =   12000
      List            =   "Shop.frx":03D4
      Style           =   2  'Dropdown List
      TabIndex        =   65
      Top             =   120
      Visible         =   0   'False
      Width           =   1155
   End
   Begin VB.TextBox Engine 
      BackColor       =   &H00C0C0C0&
      Height          =   285
      Left            =   3120
      TabIndex        =   64
      Text            =   "Engine"
      Top             =   3240
      Visible         =   0   'False
      Width           =   1095
   End
   Begin VB.TextBox Chassis 
      BackColor       =   &H00C0C0C0&
      Height          =   285
      Left            =   1500
      TabIndex        =   63
      Text            =   "Chassis"
      Top             =   3240
      Visible         =   0   'False
      Width           =   1575
   End
   Begin VB.CheckBox Snap 
      Caption         =   "Strict Values"
      Height          =   435
      Left            =   7440
      TabIndex        =   62
      Top             =   60
      Width           =   855
   End
   Begin VB.TextBox Markup 
      Height          =   285
      Left            =   5880
      Locked          =   -1  'True
      TabIndex        =   13
      Text            =   "1"
      Top             =   360
      Width           =   495
   End
   Begin VB.ComboBox ChassisFilter 
      Height          =   315
      ItemData        =   "Shop.frx":03EB
      Left            =   60
      List            =   "Shop.frx":0407
      Style           =   2  'Dropdown List
      TabIndex        =   1
      Top             =   780
      Width           =   1455
   End
   Begin VB.TextBox LoadUsed 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   7080
      Locked          =   -1  'True
      TabIndex        =   23
      Text            =   "0"
      Top             =   2280
      Width           =   555
   End
   Begin VB.TextBox CFUsed 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   7080
      Locked          =   -1  'True
      TabIndex        =   20
      Text            =   "0"
      Top             =   1980
      Width           =   555
   End
   Begin VB.TextBox VName 
      Height          =   285
      Left            =   60
      TabIndex        =   0
      Text            =   "Vehicle Name"
      Top             =   60
      Width           =   2655
   End
   Begin VB.CommandButton LoadButton 
      Caption         =   "&Load"
      Height          =   315
      Left            =   9600
      TabIndex        =   10
      Top             =   600
      Visible         =   0   'False
      Width           =   735
   End
   Begin VB.CommandButton SaveButton 
      Caption         =   "&Save As"
      Height          =   315
      Left            =   10380
      TabIndex        =   11
      Top             =   600
      Visible         =   0   'False
      Width           =   855
   End
   Begin VB.TextBox Level 
      Alignment       =   2  'Center
      BeginProperty Font {0BE35203-8F91-11CE-9DE3-00AA004BB851} 
         Name            =   "Arial Narrow"
         Size            =   12
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   420
      Left            =   4320
      TabIndex        =   7
      Text            =   "0"
      Top             =   5700
      Width           =   615
   End
   Begin VB.CommandButton DelModButton 
      Caption         =   "&Remove"
      Height          =   315
      Left            =   3000
      TabIndex        =   9
      Top             =   5760
      Width           =   1215
   End
   Begin VB.CommandButton AddModButton 
      Caption         =   "&Add"
      Height          =   315
      Left            =   120
      TabIndex        =   5
      Top             =   5760
      Width           =   1215
   End
   Begin VB.ListBox Mods 
      Height          =   1425
      Left            =   60
      Sorted          =   -1  'True
      TabIndex        =   6
      Top             =   6120
      Width           =   4155
   End
   Begin VB.ListBox ModList 
      Height          =   1815
      Left            =   60
      Sorted          =   -1  'True
      TabIndex        =   4
      Top             =   3900
      Width           =   4155
   End
   Begin VB.TextBox Cost 
      Height          =   285
      Left            =   5880
      TabIndex        =   12
      Tag             =   "0"
      Text            =   "0"
      Top             =   60
      Width           =   1155
   End
   Begin VB.TextBox Fuel 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   5880
      Locked          =   -1  'True
      TabIndex        =   30
      Text            =   "0"
      Top             =   3300
      Width           =   555
   End
   Begin VB.TextBox Sig 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   5880
      Locked          =   -1  'True
      TabIndex        =   32
      Text            =   "0"
      Top             =   5760
      Width           =   555
   End
   Begin VB.TextBox SetupTime 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   5880
      Locked          =   -1  'True
      TabIndex        =   35
      Text            =   "0"
      Top             =   5100
      Width           =   555
   End
   Begin VB.TextBox Entry 
      Height          =   285
      Left            =   5880
      TabIndex        =   37
      Top             =   4440
      Width           =   975
   End
   Begin VB.TextBox Seating 
      Height          =   285
      Left            =   5880
      TabIndex        =   36
      Top             =   4140
      Width           =   975
   End
   Begin VB.TextBox Sensor 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   5880
      Locked          =   -1  'True
      TabIndex        =   31
      Text            =   "0"
      Top             =   5460
      Width           =   555
   End
   Begin VB.TextBox Pilot 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   7620
      Locked          =   -1  'True
      TabIndex        =   34
      Text            =   "0"
      Top             =   5760
      Width           =   555
   End
   Begin VB.TextBox Autonav 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   7620
      Locked          =   -1  'True
      TabIndex        =   33
      Text            =   "0"
      Top             =   5460
      Width           =   555
   End
   Begin VB.TextBox EconomyMax 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   6480
      Locked          =   -1  'True
      TabIndex        =   29
      Text            =   "0"
      Top             =   3600
      Width           =   555
   End
   Begin VB.TextBox Economy 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   5880
      Locked          =   -1  'True
      TabIndex        =   28
      Text            =   "0"
      Top             =   3600
      Width           =   555
   End
   Begin VB.TextBox LoadMax 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   6480
      Locked          =   -1  'True
      TabIndex        =   22
      Text            =   "0"
      Top             =   2280
      Width           =   555
   End
   Begin VB.TextBox Load 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   5880
      Locked          =   -1  'True
      TabIndex        =   21
      Text            =   "0"
      Top             =   2280
      Width           =   555
   End
   Begin VB.TextBox AccelMax 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   6480
      Locked          =   -1  'True
      TabIndex        =   27
      Text            =   "0"
      Top             =   2940
      Width           =   555
   End
   Begin VB.TextBox Accel 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   5880
      Locked          =   -1  'True
      TabIndex        =   26
      Text            =   "0"
      Top             =   2940
      Width           =   555
   End
   Begin VB.TextBox SpeedMax 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   6480
      Locked          =   -1  'True
      TabIndex        =   25
      Text            =   "0"
      Top             =   2640
      Width           =   555
   End
   Begin VB.TextBox Speed 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   5880
      Locked          =   -1  'True
      TabIndex        =   24
      Text            =   "0"
      Top             =   2640
      Width           =   555
   End
   Begin VB.TextBox CFMax 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   6480
      Locked          =   -1  'True
      TabIndex        =   19
      Text            =   "0"
      Top             =   1980
      Width           =   555
   End
   Begin VB.TextBox CF 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   5880
      Locked          =   -1  'True
      TabIndex        =   18
      Text            =   "0"
      Top             =   1980
      Width           =   555
   End
   Begin VB.TextBox Armour 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   6300
      Locked          =   -1  'True
      TabIndex        =   17
      Text            =   "0"
      Top             =   1080
      Width           =   375
   End
   Begin VB.TextBox Body 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   5880
      Locked          =   -1  'True
      TabIndex        =   16
      Text            =   "0"
      Top             =   1080
      Width           =   375
   End
   Begin VB.TextBox OffRoad 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   6300
      Locked          =   -1  'True
      TabIndex        =   15
      Text            =   "0"
      Top             =   1320
      Width           =   375
   End
   Begin VB.TextBox Handling 
      Appearance      =   0  'Flat
      BorderStyle     =   0  'None
      Height          =   225
      Left            =   5880
      Locked          =   -1  'True
      TabIndex        =   14
      Text            =   "0"
      Top             =   1320
      Width           =   375
   End
   Begin VB.ListBox EngineList 
      Height          =   2130
      IntegralHeight  =   0   'False
      Left            =   2760
      Sorted          =   -1  'True
      TabIndex        =   3
      Top             =   780
      Width           =   1455
   End
   Begin VB.ListBox ChassisList 
      Height          =   1815
      Left            =   60
      Sorted          =   -1  'True
      TabIndex        =   2
      Top             =   1080
      Width           =   2655
   End
   Begin VB.VScrollBar LevelScroll 
      Height          =   3615
      Left            =   13020
      Max             =   0
      Min             =   -32768
      TabIndex        =   8
      Top             =   3780
      Visible         =   0   'False
      Width           =   255
   End
   Begin VB.Label Label10 
      Caption         =   "Chassis"
      Height          =   195
      Left            =   120
      TabIndex        =   58
      Top             =   540
      Width           =   615
   End
   Begin VB.Label Label11 
      Caption         =   "Engine"
      Height          =   195
      Left            =   2760
      TabIndex        =   59
      Top             =   540
      Width           =   615
   End
   Begin VB.Label Label16 
      Caption         =   "km"
      Height          =   195
      Left            =   7080
      TabIndex        =   87
      Top             =   3600
      Width           =   555
   End
   Begin VB.Label FuelTypeLabel 
      Height          =   225
      Left            =   6480
      TabIndex        =   86
      Top             =   3300
      Width           =   555
   End
   Begin VB.Label Label15 
      Caption         =   "Left"
      Height          =   195
      Left            =   7680
      TabIndex        =   85
      Top             =   1680
      Width           =   435
   End
   Begin VB.Label LevelLabel 
      Alignment       =   2  'Center
      Caption         =   "Level"
      Height          =   195
      Left            =   4200
      TabIndex        =   56
      Top             =   5520
      Width           =   855
   End
   Begin VB.Label Label2 
      Caption         =   "Max"
      Height          =   195
      Index           =   1
      Left            =   6480
      TabIndex        =   69
      Top             =   1680
      Width           =   435
   End
   Begin VB.Label Label1 
      Caption         =   "Suggested Cost (Y)"
      Height          =   195
      Index           =   13
      Left            =   4440
      TabIndex        =   67
      Top             =   720
      Width           =   1395
   End
   Begin VB.Label Label1 
      Caption         =   "Markup"
      Height          =   195
      Index           =   12
      Left            =   5160
      TabIndex        =   61
      Top             =   420
      Width           =   615
   End
   Begin VB.Label Label12 
      Caption         =   "Modifications"
      Height          =   195
      Left            =   120
      TabIndex        =   60
      Top             =   3360
      Width           =   975
   End
   Begin VB.Label Label9 
      Caption         =   "Used"
      Height          =   195
      Left            =   7080
      TabIndex        =   57
      Top             =   1680
      Width           =   435
   End
   Begin MSComDlg.CommonDialog cmdiag 
      Left            =   10440
      Top             =   60
      _ExtentX        =   847
      _ExtentY        =   847
      _Version        =   327681
      CancelError     =   -1  'True
      DefaultExt      =   ".shp"
      Filter          =   "Shop Files|*.shp|HTML Template|*.htm|All Files|*.*"
      FilterIndex     =   1
   End
   Begin VB.Label Label1 
      Caption         =   "DP Cost"
      Height          =   195
      Index           =   11
      Left            =   5220
      TabIndex        =   55
      Top             =   120
      Width           =   615
   End
   Begin VB.Label Label1 
      Alignment       =   1  'Right Justify
      Caption         =   "Fuel"
      Height          =   195
      Index           =   10
      Left            =   5100
      TabIndex        =   54
      Top             =   3300
      Width           =   675
   End
   Begin VB.Label Label1 
      Alignment       =   1  'Right Justify
      Caption         =   "Sig"
      Height          =   195
      Index           =   9
      Left            =   4980
      TabIndex        =   53
      Top             =   5760
      Width           =   795
   End
   Begin VB.Label TOLLabel 
      Alignment       =   1  'Right Justify
      Caption         =   "Profile"
      Height          =   195
      Left            =   5100
      TabIndex        =   52
      Top             =   4800
      Width           =   675
   End
   Begin VB.Label Label1 
      Alignment       =   1  'Right Justify
      Caption         =   "Setup time"
      Height          =   195
      Index           =   7
      Left            =   4980
      TabIndex        =   51
      Top             =   5100
      Width           =   795
   End
   Begin VB.Label Label1 
      Alignment       =   1  'Right Justify
      Caption         =   "Entry"
      Height          =   195
      Index           =   6
      Left            =   5100
      TabIndex        =   50
      Top             =   4500
      Width           =   675
   End
   Begin VB.Label Label1 
      Alignment       =   1  'Right Justify
      Caption         =   "Seating"
      Height          =   195
      Index           =   5
      Left            =   5100
      TabIndex        =   49
      Top             =   4200
      Width           =   675
   End
   Begin VB.Label Label1 
      Alignment       =   1  'Right Justify
      Caption         =   "Sensor"
      Height          =   195
      Index           =   4
      Left            =   4980
      TabIndex        =   48
      Top             =   5460
      Width           =   795
   End
   Begin VB.Label PilotLabel 
      Alignment       =   1  'Right Justify
      Caption         =   "Pilot"
      Height          =   195
      Left            =   6720
      TabIndex        =   47
      Top             =   5760
      Width           =   795
   End
   Begin VB.Label AutonavLabel 
      Alignment       =   1  'Right Justify
      Caption         =   "Autonav"
      Height          =   195
      Left            =   6720
      TabIndex        =   46
      Top             =   5460
      Width           =   795
   End
   Begin VB.Label Label7 
      Alignment       =   1  'Right Justify
      Caption         =   "Economy"
      Height          =   195
      Left            =   5100
      TabIndex        =   45
      Top             =   3600
      Width           =   675
   End
   Begin VB.Label Label6 
      Alignment       =   1  'Right Justify
      Caption         =   "Load"
      Height          =   195
      Left            =   5100
      TabIndex        =   44
      Top             =   2280
      Width           =   675
   End
   Begin VB.Label Label5 
      Alignment       =   1  'Right Justify
      Caption         =   "CF"
      Height          =   195
      Left            =   5100
      TabIndex        =   43
      Top             =   1980
      Width           =   675
   End
   Begin VB.Label Label4 
      Alignment       =   1  'Right Justify
      Caption         =   "Accel"
      Height          =   195
      Left            =   5100
      TabIndex        =   42
      Top             =   2940
      Width           =   675
   End
   Begin VB.Label Label3 
      Alignment       =   1  'Right Justify
      Caption         =   "Speed"
      Height          =   195
      Left            =   5100
      TabIndex        =   41
      Top             =   2640
      Width           =   675
   End
   Begin VB.Label Label2 
      Caption         =   "Current"
      Height          =   195
      Index           =   0
      Left            =   5880
      TabIndex        =   40
      Top             =   1680
      Width           =   555
   End
   Begin VB.Label Label1 
      Caption         =   "Body/Armour"
      Height          =   195
      Index           =   1
      Left            =   4800
      TabIndex        =   39
      Top             =   1080
      Width           =   975
   End
   Begin VB.Label Label1 
      Caption         =   "Handling"
      Height          =   195
      Index           =   0
      Left            =   5100
      TabIndex        =   38
      Top             =   1320
      Width           =   675
   End
   Begin VB.Menu menuFile 
      Caption         =   "&File"
      NegotiatePosition=   1  'Left
      Begin VB.Menu fileNew 
         Caption         =   "&New"
         Shortcut        =   ^N
      End
      Begin VB.Menu fileOpen 
         Caption         =   "&Open"
         Shortcut        =   ^L
      End
      Begin VB.Menu fileSave 
         Caption         =   "&Save As"
         Shortcut        =   ^S
      End
      Begin VB.Menu fileSep1 
         Caption         =   "-"
      End
      Begin VB.Menu fileExportHTML 
         Caption         =   "&Export to HTML"
         Shortcut        =   ^E
      End
      Begin VB.Menu fileSep2 
         Caption         =   "-"
      End
      Begin VB.Menu fileExit 
         Caption         =   "E&xit"
      End
   End
   Begin VB.Menu menuBooks 
      Caption         =   "&Books"
      Begin VB.Menu booksManage 
         Caption         =   "&Manage"
         Shortcut        =   ^M
      End
   End
   Begin VB.Menu menuHelp 
      Caption         =   "&Help"
      NegotiatePosition=   3  'Right
      Begin VB.Menu helpContents 
         Caption         =   "&Contents"
         Enabled         =   0   'False
      End
      Begin VB.Menu helpAbout 
         Caption         =   "&About"
         Shortcut        =   ^A
      End
   End
End
Attribute VB_Name = "Shop"
Attribute VB_Creatable = False
Attribute VB_Exposed = False
Dim InhibitRecalc As Boolean

Public Sub Recalc()
Dim opt As String, options As String
    ' Recalculate everything currently selected
    
    ' Do as much as you can.
    On Error Resume Next
    If InhibitRecalc Then
        Exit Sub
    End If
    
    ' reset base chassis, engine and markup info
    Set v.Chassis = ChassisC.Item(ChassisList)
    Set v.Engine = v.Chassis.EngineC.Item(EngineList)
    
    Clear_Vars
    
    ' redisplay chassis and engine info
    ' chassis info
    Me.Handling = v.Chassis.Handling
    Me.OffRoad = v.Chassis.OffRoad
    Me.Body = v.Chassis.Body
    Me.Armour = v.Chassis.Armour
    Me.CF = v.Chassis.CF
    Me.CFMax = v.Chassis.CFMax
    Me.CFUsed = 0
    
    ' Autonav && Pilot are -1 if not available.
    Me.Autonav = v.Chassis.Autonav
    Me.Pilot = v.Chassis.Pilot
    
    Me.Sensor = v.Chassis.Sensor
    If Me.Seating = "" Or Me.Seating.Tag = "" Then _
        Me.Seating = v.Chassis.Seating
    If Me.Entry = "" Or Me.Entry.Tag = "" Then _
        Me.Entry = v.Chassis.Entry
        
    Me.SetupTime = v.Chassis.SetupTime
    Me.TOL = v.Chassis.TOL
' haven't dealt with this yet
'    Me.Other = Chassis.Other
    Me.Cost = v.Chassis.Cost

    ' engine info
    Me.Speed = v.Engine.Speed
    Me.SpeedMax = v.Engine.SpeedMax
    Me.Accel = v.Engine.Accel
    Me.AccelMax = v.Engine.AccelMax
    Me.Load = v.Engine.Load
    Me.LoadMax = v.Engine.LoadMax
    Me.LoadUsed = 0
    Me.Sig = v.Engine.Sig
    Me.Economy = v.Engine.Economy
    Me.EconomyMax = v.Engine.EconomyMax
    Me.Fuel = v.Engine.Fuel
    Me.Cost = Me.Cost + v.Engine.Cost
    
    ' Calculate base markup value
    If v.Chassis.ChassisType = 17 Then
        Me.Markup = 0.5
    ElseIf v.Chassis.ChassisType And 1 Then
        ' car
        Me.Markup = 1
    ElseIf v.Chassis.ChassisType And 2 Then
        ' water
        Me.Markup = 1
    ElseIf v.Chassis.ChassisType And 4 Then
        ' hover
        Me.Markup = 2.5
    ElseIf v.Chassis.ChassisType And 8 Then
        ' air
        Me.Markup = 2.5
    Else
        ' other (like specials, etc.)
        Me.Markup = 1
    End If
    Me.Security = False
    Me.Military = False
    
    ' Cycle through mods, applying changes
    On Error GoTo ExprError
    Dim evaled As Integer, Priority As Integer
    Dim mcost, mcosty
    evaled = 0
    Priority = 1
    Cost = Cost + v.Cost
    While evaled <> v.ModC.Count
        ' loop through list evaluating the next level...
        For idx = 1 To v.ModC.Count
            mcost = Cost
            mcosty = CostY
            If v.ModC(idx).Priority = Priority Then
                evaled = evaled + 1
                Me.LevelLabel.Caption = v.ModC(idx).Label
                Me.Level = v.ModC(idx).Level
                Markup = Markup * v.ModC(idx).Markup
                x = Eval(Me, v.ModC(idx).expr)
                
                If idx <= Skip Then
                    Cost = mcost
                    CostY = mcosty
                End If
            End If
        Next idx
        Priority = Priority + 1
    Wend
    
    If Mods.ListIndex = -1 Then
        Me.Level = 0
    Else
        Me.LevelLabel = v.ModC.Item(Mods).Label
        Me.Level = v.ModC(Mods).Level
        ' recheck level limit
        If Not Eval(Me, ModC.Item(Mods).limit) Then
            Level.BackColor = ErrorColour
        Else
            Level.BackColor = NormalColour
        End If
    End If
    
    ' some visibilities
    If TOL = "N" Or TOL = "NA" Or TOL = "N/A" Then
        TOL.Visible = False
    Else
        TOL.Visible = True
    End If
    TOLLabel.Visible = TOL.Visible
    
    If Pilot = -1 Then
        Pilot.Visible = False
    Else
        Pilot.Visible = True
    End If
    PilotLabel.Visible = Pilot.Visible
    
    If Autonav = -1 Then
        Autonav.Visible = False
    Else
        Autonav.Visible = True
    End If
    AutonavLabel.Visible = Autonav.Visible
    
    ' some relabeling
    Select Case Engine
        Case "Methane"
            FuelTypeLabel = "bars"
        Case "Electric"
            FuelTypeLabel = "PF"
        Case "Sail"
            FuelTypeLabel = ""
        Case Else
            FuelTypeLabel = "liters"
    End Select

'    On Error GoTo ExprError
    ' Check various limits
    If CSng(CFUsed) > CSng(CF) Then
        CFUsed.BackColor = ErrorColour
    Else
        CFUsed.BackColor = NormalColour
    End If
    If CSng(LoadUsed) > CSng(Load) Then
        LoadUsed.BackColor = ErrorColour
    Else
        LoadUsed.BackColor = NormalColour
    End If
    If CSng(CF) > CSng(CFMax) Then
        CF.BackColor = ErrorColour
    Else
        CF.BackColor = NormalColour
    End If
    If CSng(Load) > CSng(LoadMax) Then
        Load.BackColor = ErrorColour
    Else
        Load.BackColor = NormalColour
    End If
    If CSng(Speed) > CSng(SpeedMax) Then
        Speed.BackColor = ErrorColour
    Else
        Speed.BackColor = NormalColour
    End If
    If CSng(Accel) > CSng(AccelMax) Then
        Accel.BackColor = ErrorColour
    Else
        Accel.BackColor = NormalColour
    End If
    If CSng(Economy) > CSng(EconomyMax) Then
        Economy.BackColor = ErrorColour
    Else
        Economy.BackColor = NormalColour
    End If
    
    Markup.Tag = Markup
    Recalc_Cost
    
    ' Snap some values
    ' The big numbers (like Cost, Speed) should be ints
    Speed = CInt(Speed)
    Snap_Check
    
    Exit Sub
ExprError:
    MsgBox "Error in expression" & Chr$(10) & Error$
'    Resume
    Exit Sub
End Sub

Sub Recalc_Cost()
    On Error Resume Next
    
    ' restore basic value
    Markup = Markup.Tag
    
    ' markup modifiers
    If M_AmbulanceC Then
        Markup = CSng(Markup) + 1
    End If
    
    If M_NCVC Then
        Markup = CSng(Markup) + M_NCV
    End If
    
    If M_UnusualC Then
        Markup = CSng(Markup) + M_Unusual
    End If
    
    ' secondary markup multiplier
    If Drone Then
        Markup = CSng(Markup) / 10
    End If
    
    If M_LuxuryC Then
        Markup = CSng(Markup) * CSng(M_Luxury)
    End If
    
    If Military Then
        If M_SpecialC And M_Special >= 3 Then
            Markup = CSng(Markup) * CSng(M_Special)
        Else
            Markup = CSng(Markup) * 4
        End If
    ElseIf Security Then
        If M_SpecialC Then
            Markup = CSng(Markup) * CSng(M_Special)
        Else
            Markup = CSng(Markup) * 2.5
        End If
    ElseIf M_SpecialC Then
        Markup = CSng(Markup) * CSng(M_Special)
    End If

    CostY = Fix(Cost + 0.5) * CSng(Markup) * 100
    Cost = Fix(Cost + 0.5)
End Sub

Private Sub ResetFilters()
    ' Load the Chassis listbox
    ' (the engine listbox is based on the chassis)
    ' Load the mod filter listboxes
    ChassisBookFilter.Clear
    ChassisFilter.ListIndex = 0
    For Each Bookname In BookC
        ChassisBookFilter.AddItem Bookname
    Next Bookname
    ChassisBookFilter.ListIndex = 0
    ChassisBookFilter_Change
'    ChassisFilter_Change
    
    ' Load the mod filter listboxes
    ModBookFilter.Clear
    ModFilter.ListIndex = 0
    For Each Bookname In BookC
        ModBookFilter.AddItem Bookname
    Next Bookname
    ModBookFilter.ListIndex = 0
    ModBookFilter_Change
End Sub

Private Sub Snap_Check()
    If Snap Then
        ' limit maximums
        If CDbl(Speed) > CDbl(SpeedMax) Then Speed = SpeedMax
        If CDbl(Accel) > CDbl(AccelMax) Then Accel = AccelMax
        If CDbl(Economy) > CDbl(EconomyMax) Then Economy = EconomyMax
        If CDbl(Load) > CDbl(LoadMax) Then Load = LoadMax
        If CDbl(CF) > CDbl(CFMax) Then CF = CFMax
        
        ' snap to integers
        Body = CInt(Body)
        Armour = CInt(Armour)
        Handling = CInt(Handling)
        OffRoad = CInt(OffRoad)
    End If
    ' Calculate secondary values after snap
    CFLeft = CF - CFUsed
    LoadLeft = Load - LoadUsed
End Sub

Private Sub AboutButton_Click()
    About.Show
End Sub

Private Sub AddModButton_Click()
Dim mi As Integer, idx As Integer
    On Error GoTo AddModError
    ' Add mod to V.ModC
    v.ModC.Add ModC.Item(ModList), ModList
    Mods.AddItem ModList
    
    ' select that mod
    mi = 0
    For idx = 0 To Mods.ListCount - 1
        If Mods.List(idx) = ModList Then
            mi = idx
        End If
    Next idx
    Mods.ListIndex = mi
    Mods_Click
    Recalc
    Exit Sub
AddModError:
    If Err = 457 Then
        ' key already exists - duplicate mod
        Exit Sub
    End If
    MsgBox Error
'    Resume
End Sub

Private Sub booksManage_Click()
    If MsgBox("This will clear the current vehicle.  Continue?", vbYesNo + vbExclamation) = vbYes Then
        ManageBooks.Show 1
        fileNew_Click
        Form_Load
    End If
End Sub

Private Sub ChassisBookFilter_Change()
    If ChassisBookFilter = "Shop" Or ChassisBookFilter = "All" Then
        ' show everything
        ChassisBookFilter.Tag = "*"
    Else
        ' show only those mods
        ChassisBookFilter.Tag = ChassisBookFilter
    End If
    ChassisFilter_change
End Sub

Private Sub ChassisBookFilter_Click()
    ChassisBookFilter_Change
End Sub

Sub ChassisFilter_change()
Dim temp As String
    temp = ChassisList
    ' Filter ChassisList
    ChassisList.Clear
        
    Select Case ChassisFilter
        Case "All"
            For Each chas In ChassisC
                If chas.Book Like ChassisBookFilter.Tag Then _
                    ChassisList.AddItem chas.ChassisName
            Next chas
        Case "All Drones"
            For Each chas In ChassisC
                If chas.Pilot <> -1 And chas.Book Like ChassisBookFilter.Tag Then _
                    ChassisList.AddItem chas.ChassisName
            Next chas
        Case "All Vehicles"
            For Each chas In ChassisC
                If chas.Pilot = -1 And chas.Book Like ChassisBookFilter.Tag Then _
                    ChassisList.AddItem chas.ChassisName
            Next chas
        Case "Bikes"
            For Each chas In ChassisC
                If chas.ChassisType = 17 And chas.Book Like ChassisBookFilter.Tag Then _
                    ChassisList.AddItem chas.ChassisName
            Next chas
        Case "Ground vehicles"
            For Each chas In ChassisC
                If chas.ChassisType And 1 And chas.Book Like ChassisBookFilter.Tag Then _
                    ChassisList.AddItem chas.ChassisName
            Next chas
        Case "Water craft"
            For Each chas In ChassisC
                If chas.ChassisType And 2 And chas.Book Like ChassisBookFilter.Tag Then _
                    ChassisList.AddItem chas.ChassisName
            Next chas
        Case "Hovercraft"
            For Each chas In ChassisC
                If chas.ChassisType And 4 And chas.Book Like ChassisBookFilter.Tag Then _
                    ChassisList.AddItem chas.ChassisName
            Next chas
        Case "Aircraft"
            For Each chas In ChassisC
                If chas.ChassisType And 8 And chas.Book Like ChassisBookFilter.Tag Then _
                    ChassisList.AddItem chas.ChassisName
            Next chas
    End Select
    
    ' Try to find current selection
    ChassisList.ListIndex = 0
    For idx = 0 To ChassisList.ListCount - 1
        If ChassisList.List(idx) = temp Then
            ChassisList.ListIndex = idx
        End If
    Next idx
End Sub

Private Sub ChassisFilter_Click()
    ChassisFilter_change
End Sub

Sub ChassisList_Click()
Dim cnt As Integer
Dim c As ChassisClass
Dim en As String, ei As Integer
    Chassis = ChassisList
    
    ' Save current engine name
    en = EngineList
    ' Fill list of Engines
    EngineList.Clear
    Set c = ChassisC.Item(CStr(ChassisList))
    For cnt = 1 To c.EngineC.Count
        EngineList.AddItem c.EngineC.Item(cnt).EngineName
    Next cnt
    ' try to reselect that engine
    On Error Resume Next
    ' find an engine with the same name
    ei = 0
    For idx = 0 To EngineList.ListCount - 1
        If EngineList.List(idx) = en Then
            ei = idx
        End If
    Next idx
    EngineList.ListIndex = ei
    
    ' if the chassis is a drone, select drone checkbox
    If c.Pilot <> -1 Then
        Drone = 1
    Else
        Drone = 0
    End If
    
    Recalc
End Sub

Private Sub ClearButton_Click()
    v.Cost = 0
    v.Skip = 0
End Sub

Private Sub Cost_GotFocus()
    Cost.Tag = Cost
End Sub

Private Sub DelModButton_Click()
Dim li As Integer
    If Mods = "" Then
        Exit Sub
    End If
    ' Remove mod from Vehicle.ModC, recalc
    LevelLabel.Caption = "Level"
    LevelUp.Visible = True
'    Level.Visible = True
    LevelDown.Visible = True
    
    Book = ""
    v.ModC.Remove Mods
    li = Mods.ListIndex
    Mods.RemoveItem Mods.ListIndex
    If Mods.ListCount > 0 Then
        If Mods.ListCount > li Then
            Mods.ListIndex = li
        Else
            Mods.ListIndex = li - 1
        End If
    End If
    Mods_Click
    Recalc
End Sub

Private Sub Drone_Click()
    Recalc
End Sub

Private Sub DroneLabel_Click()
    If Drone Then
        Drone = 0
    Else
        Drone = 1
    End If
    Drone_Click
End Sub

Private Sub EngineList_Click()
    Engine = EngineList
    Recalc
End Sub

Private Sub Entry_KeyPress(KeyAscii As Integer)
    If KeyAscii = 13 Or KeyAscii = 10 Then
        KeyAscii = 0
        Entry_LostFocus
    End If
End Sub

Private Sub Entry_LostFocus()
    On Error Resume Next
    If Me.Entry = "" Then
        Me.Entry.Tag = ""
        Me.Entry = v.Chassis.Entry
    Else
        Me.Entry.Tag = Me.Entry
    End If
End Sub

Private Sub fileExit_Click()
    Unload Me
    End
End Sub

Private Sub fileExportHTML_Click()
    ExportHTML Me
End Sub

Private Sub fileNew_Click()
    ' just clear some stuff...
    VName = "Vehicle Name"
    
    ChassisList.ListIndex = 0
    ChassisFilter.ListIndex = 0
    ChassisFilter_change
    
    ModList.ListIndex = 0
    ModBookFilter.ListIndex = 0
    ModBookFilter_Change
    
    M_AmbulanceC = False
    M_NCVC = False
    M_UnusualC = False
    M_LuxuryC = False
    M_SpecialC = False
    
    Mods.Clear
    While v.ModC.Count > 0
        v.ModC.Remove 1
    Wend
'    v.ModC.Clear
    
    ' Default to Design-time
    Time = "Design"
    Recalc
End Sub

Private Sub fileOpen_Click()
    LoadVehicle Me
    ResetFilters
End Sub

Private Sub fileSave_Click()
    SaveVehicle Me
End Sub

Private Sub Form_Load()
    InhibitRecalc = False
    ' Get Shop location
    ShopDir = App.Path
    ' Load data
    LoadData (ShopDataFile)
    
    ' if it's empty, add a couple
    If ChassisC.Count = 0 Then
        Dim c As New ChassisClass
        
        MsgBox "No chasses found."
        
        c.ChassisName = "Sedan"
        c.Handling = 4
        c.OffRoad = 8
        c.Body = 2
        c.Armour = 0
        c.CF = 6
        c.CFMax = 30
        c.Autonav = 0
        c.Pilot = 0
        c.Sensor = 0
        c.Seating = "2b + 2b"
        c.Entry = "2 + 1t"
        c.SetupTime = 0
        c.TOL = "N"
        c.Other = ""
        c.Cost = 50
        ChassisC.Add c, c.ChassisName
        
'        SaveChassisC ChassisFile
    End If
    
    ' if it's empty, add a couple
    If ChassisC.Item("Sedan").EngineC.Count = 0 Then
        Dim e As New EngineClass
        
        MsgBox "No engines found"
        
        e.EngineName = "Gasoline"
        e.Speed = 100
        e.SpeedMax = 160
        e.Accel = 8
        e.AccelMax = 14
        e.Load = 60
        e.LoadMax = 300
        e.Sig = 2
        e.Economy = 8
        e.EconomyMax = 14
        e.Fuel = 60
        e.Cost = 25
        ChassisC.Item("Sedan").EngineC.Add e, e.EngineName
        
'        SaveEngineC EngineFile
    End If
    
    ' if it's empty, add a couple
    If ModC.Count = 0 Then
        Dim m As New ModClass
        
        MsgBox "No modifications found."
        
        m.ModName = "Acceleration Increase"
        m.Level = 0
        m.limit = "Accel < AccelMax + 1"
        m.expr = "Accel = Accel + Level;Cost = Cost + 2 * Level"
        m.Priority = 1
        ModC.Add m, m.ModName
    
'        SaveModC ModFile
    End If
    
    ' set the chassis/mod book filters
    ResetFilters
    
    ' Default to Design-time
    Time = "Design"
    Recalc
End Sub

Private Sub Form_Unload(Cancel As Integer)
    ' exit
    End
End Sub

Private Sub helpAbout_Click()
    About.Show
End Sub

Private Sub Level_GotFocus()
    ' Save current Mod name
    On Error Resume Next
    Level.Tag = Mods
End Sub

Private Sub Level_KeyPress(KeyAscii As Integer)
    If KeyAscii = 13 Or KeyAscii = 10 Then
        KeyAscii = 0
        On Error Resume Next
        If CInt(Level) < 0 Then Level = 0
        LevelScroll = -CInt(Level)
        Level.Tag = ""
        Recalc
    End If
End Sub

Private Sub Level_LostFocus()
    On Error Resume Next
    If CInt(Level) < 0 Then Level = 0
    LevelScroll = -CInt(Level)
    Level.Tag = ""
End Sub

Private Sub LevelDown_Click()
    If LevelScroll < 0 Then
        LevelScroll = LevelScroll + 1
    End If
End Sub

Private Sub LevelScroll_Change()
    On Error Resume Next
    Level = -CInt(LevelScroll)
    
    If Level.Tag = "" Then
        Level.Tag = Mods
    End If
    
    ' save level in ModC
    If Mods.ListCount > 0 Then
        v.ModC.Item(Level.Tag).Level = Level
        ' Recalculate mod's effects
        Recalc
        If Not Eval(Me, ModC.Item(Level.Tag).limit) Then
            Level.BackColor = ErrorColour
        Else
            Level.BackColor = NormalColour
        End If
    End If
    
    Level.Tag = ""
End Sub

Private Sub LevelScroll_Scroll()
'    LevelScroll_Change
End Sub


Private Sub LevelUp_Click()
    LevelScroll = LevelScroll - 1
End Sub

Private Sub LoadButton_Click()
'    LoadVehicle Me
End Sub

Private Sub M_AmbulanceC_Click()
    Recalc_Cost
End Sub

Private Sub M_LuxuryC_Click()
    If M_LuxuryC Then
        M_Luxury.Enabled = True
        M_LuxuryScroll.Enabled = True
    Else
        M_Luxury.Enabled = False
        M_LuxuryScroll.Enabled = False
    End If
    Recalc_Cost
End Sub

Private Sub M_LuxuryScroll_Change()
    M_Luxury = M_LuxuryScroll / 100
    Recalc_Cost
End Sub

Private Sub M_NCVscroll_Change()
    M_NCV = M_NCVscroll / 100
    Recalc_Cost
End Sub

Private Sub M_Special_Click()
    If M_Special Then
        M_Special.Enabled = True
        M_SpecialScroll.Enabled = True
    Else
        M_Special.Enabled = False
        M_SpecialScroll.Enabled = False
    End If
    Recalc_Cost
End Sub

Private Sub M_SpecialC_Click()
    If M_SpecialC Then
        M_Special.Enabled = True
        M_SpecialScroll.Enabled = True
    Else
        M_Special.Enabled = False
        M_SpecialScroll.Enabled = False
    End If
    Recalc_Cost
End Sub

Private Sub M_SpecialScroll_Change()
    M_Special = M_SpecialScroll / 100
    If M_Special >= 3 Then
        M_SpecialC.Caption = "Restricted (Military)"
    Else
        M_SpecialC.Caption = "Restricted (Security)"
    End If
    Recalc_Cost
End Sub

Private Sub M_NCVC_Click()
    If M_NCVC Then
        M_NCV.Enabled = True
        M_NCVscroll.Enabled = True
    Else
        M_NCV.Enabled = False
        M_NCVscroll.Enabled = False
    End If
    Recalc_Cost
End Sub

Private Sub M_UnusualC_Click()
    If M_UnusualC Then
        M_Unusual.Enabled = True
        M_UnusualScroll.Enabled = True
    Else
        M_Unusual.Enabled = False
        M_UnusualScroll.Enabled = False
    End If
    Recalc_Cost
End Sub

Private Sub M_UnusualScroll_Change()
    M_Unusual = M_UnusualScroll / 100
    Recalc_Cost
End Sub

Private Sub ModBookFilter_Change()
    If ModBookFilter = "Shop" Or ModBookFilter = "All" Then
        ' show everything
        ModBookFilter.Tag = "*"
    Else
        ' show only those mods
        ModBookFilter.Tag = ModBookFilter
    End If
    ModFilter_Change
End Sub

Private Sub ModBookFilter_Click()
    ModBookFilter_Change
End Sub

Private Sub ModFilter_Change()
Dim filter As Integer
    ' Filter ModList
    ModList.Clear
    Select Case ModFilter
        Case "All"
            filter = 0
        Case "Design Options"
            filter = 1
        Case "Engine Customization"
            filter = 2
        Case "Control Systems"
            filter = 3
        Case "Protective Systems"
            filter = 4
        Case "Signature"
            filter = 5
        Case "Weapon Mounts"
            filter = 6
        Case "Electronic Systems"
            filter = 7
        Case "Accessories"
            filter = 8
        Case "Other"
            filter = 9
    End Select
    
    For cnt = 1 To ModC.Count
        If ModC.Item(cnt).Book Like ModBookFilter.Tag Then
            If filter = 0 Or ModC.Item(cnt).ModType = filter Then
                ModList.AddItem ModC.Item(cnt).ModName
            End If
        End If
    Next cnt
End Sub

Private Sub ModFilter_Click()
    ModFilter_Change
End Sub

Private Sub ModList_Click()
    ' show source
    Book = ModC.Item(ModList).Book
End Sub

Private Sub ModList_DblClick()
    AddModButton_Click
End Sub

Private Sub Mods_Click()
    If Mods = "" Then
        Exit Sub
    End If
    ' set level for that mod
    InhibitRecalc = True
    LevelLabel.Caption = v.ModC.Item(Mods).Label
    ' if the label is blank, we shouldn't need to
    ' be able to change the level
    If LevelLabel.Caption = "" Then
        LevelUp.Visible = False
'        Level.Visible = False
        LevelDown.Visible = False
    Else
        LevelUp.Visible = True
'        Level.Visible = True
        LevelDown.Visible = True
    End If
    
    Book = v.ModC.Item(Mods).Book
    Level = v.ModC.Item(Mods).Level
    LevelScroll = -Level
    InhibitRecalc = False
    ' recheck level limit
    If Not Eval(Me, ModC.Item(Mods).limit) Then
        Level.BackColor = ErrorColour
    Else
        Level.BackColor = NormalColour
    End If
End Sub

Private Sub Mods_DblClick()
    DelModButton_Click
End Sub

Private Sub SaveButton_Click()
'    SaveVehicle Me
End Sub

Private Sub Seating_KeyPress(KeyAscii As Integer)
    If KeyAscii = 13 Or KeyAscii = 10 Then
        KeyAscii = 0
        Seating_LostFocus
    End If
End Sub

Private Sub Seating_LostFocus()
    On Error Resume Next
    If Me.Seating = "" Then
        Me.Seating.Tag = ""
        Me.Seating = v.Chassis.Seating
    Else
        Me.Seating.Tag = Me.Seating
    End If
End Sub

Private Sub Snap_Click()
    Recalc
End Sub

Private Sub SnapLabel_Click()
    If Snap Then
        Snap = 0
    Else
        Snap = 1
    End If
    Snap_Click
End Sub

Private Sub SnapLabel_DblClick()
    SnapLabel_Click
End Sub

Private Sub TareButton_Click()
    ' Set base value for Cost
    v.Cost = CInt(Cost) - CInt(Cost.Tag)
    v.Skip = v.ModC.Count
End Sub

Private Sub VName_Change()
    v.name = Me.VName
End Sub
