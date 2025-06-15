VERSION 4.00
Begin VB.Form About 
   BorderStyle     =   1  'Fixed Single
   Caption         =   "About The Shop"
   ClientHeight    =   3630
   ClientLeft      =   3180
   ClientTop       =   2850
   ClientWidth     =   4215
   Height          =   4035
   Icon            =   "About.frx":0000
   Left            =   3120
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   NegotiateMenus  =   0   'False
   ScaleHeight     =   3630
   ScaleWidth      =   4215
   Top             =   2505
   Width           =   4335
   Begin VB.CommandButton OK 
      Caption         =   "&OK"
      Default         =   -1  'True
      Height          =   375
      Left            =   1020
      TabIndex        =   8
      Top             =   3000
      Width           =   2115
   End
   Begin VB.TextBox Text1 
      Appearance      =   0  'Flat
      BackColor       =   &H8000000F&
      BorderStyle     =   0  'None
      ForeColor       =   &H80000012&
      Height          =   255
      Index           =   3
      Left            =   720
      Locked          =   -1  'True
      TabIndex        =   6
      Text            =   "mailto:Harvester@btinternet.com"
      Top             =   2520
      Width           =   3135
   End
   Begin VB.TextBox Text1 
      Appearance      =   0  'Flat
      BackColor       =   &H8000000F&
      BorderStyle     =   0  'None
      ForeColor       =   &H80000012&
      Height          =   255
      Index           =   2
      Left            =   720
      Locked          =   -1  'True
      TabIndex        =   5
      Text            =   "mailto:james.ojaste@ec.gc.ca"
      Top             =   1980
      Width           =   3135
   End
   Begin VB.TextBox Text1 
      Appearance      =   0  'Flat
      BackColor       =   &H8000000F&
      BorderStyle     =   0  'None
      ForeColor       =   &H80000012&
      Height          =   255
      Index           =   1
      Left            =   720
      Locked          =   -1  'True
      TabIndex        =   4
      Text            =   "http://ojaste.dhs.org/~ojastej/"
      Top             =   1680
      Width           =   3135
   End
   Begin VB.TextBox Text1 
      Appearance      =   0  'Flat
      BackColor       =   &H8000000F&
      BorderStyle     =   0  'None
      BeginProperty Font {0BE35203-8F91-11CE-9DE3-00AA004BB851} 
         Name            =   "MS Sans Serif"
         Size            =   8.25
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      ForeColor       =   &H80000012&
      Height          =   255
      Index           =   0
      Left            =   480
      Locked          =   -1  'True
      TabIndex        =   3
      Text            =   "http://ojaste.dhs.org/~ojastej/SR/"
      Top             =   1020
      Width           =   3135
   End
   Begin VB.Label Label4 
      Caption         =   "All trademarks property of their respective owners, etc."
      BeginProperty Font {0BE35203-8F91-11CE-9DE3-00AA004BB851} 
         Name            =   "Arial"
         Size            =   6
         Charset         =   0
         Weight          =   400
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   195
      Left            =   660
      TabIndex        =   7
      Top             =   3420
      Width           =   2835
   End
   Begin VB.Label Label3 
      Caption         =   "Much data entry by David Taylor"
      Height          =   195
      Left            =   480
      TabIndex        =   2
      Top             =   2280
      Width           =   3375
   End
   Begin VB.Label Label2 
      Caption         =   "Written by James Ojaste"
      Height          =   255
      Left            =   480
      TabIndex        =   1
      Top             =   1380
      Width           =   3375
   End
   Begin VB.Label Label1 
      Alignment       =   2  'Center
      Caption         =   "The Shop"
      BeginProperty Font {0BE35203-8F91-11CE-9DE3-00AA004BB851} 
         Name            =   "Arial"
         Size            =   36
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   -1  'True
         Strikethrough   =   0   'False
      EndProperty
      Height          =   855
      Left            =   180
      TabIndex        =   0
      Top             =   120
      Width           =   3855
   End
End
Attribute VB_Name = "About"
Attribute VB_Creatable = False
Attribute VB_Exposed = False
Private Sub OK_Click()
    Me.Hide
End Sub
