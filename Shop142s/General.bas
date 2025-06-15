Attribute VB_Name = "General"
Type ChassisT
    ChassisType As Integer
    ChassisName As String
    Handling As Integer     ' OnRoad handling
    OffRoad As Integer      ' OffRoad handling
    Body As Integer         ' Body
    Armour As Integer       ' Armour
    CF As Integer           ' Starting CF
    CFMax As Integer        ' Max CF
    Autonav As Integer      ' Autonav level
    Pilot As Integer        ' Pilot level
    Sensor As Integer       ' Sensor level
    Seating As String       ' Seating arrangement
    Entry As String         ' Entry points
    SetupTime As Integer    ' Setup/Breakdown
    TOL As String           ' Takeoff/landing profile
    Other As String         ' Accessories
    Cost As Integer         ' Design points
    EngineC As Collection   ' Engine specs for this chassis

    Book As String   ' where's it from?
End Type

Type EngineT
    EngineName As String
    Speed As Integer
    SpeedMax As Integer
    Accel As Integer
    AccelMax As Integer
    Load As Long
    LoadMax As Long
    Sig As Integer
    Economy As Single
    EconomyMax As Single
    Fuel As Integer
    Cost As Integer

    Book As String   ' where's it from?
End Type

Type ModT
    ModType As Integer
    ModName As String      ' Name of mod
    Markup As Single    ' E: Markup modifier
    Level As Integer    ' Level of mod
    Label As String     ' label of "levels"
    limit As String     ' Levels of mod available
    expr As String      ' Expr
    Priority As Integer ' 1 = low

    Book As String   ' where's it from?
End Type

Type VehicleT
    name As String
    Cost As Integer
    Skip As Integer
    Chassis As ChassisClass
    Engine As EngineClass
    ModC As New Collection

    Books As New Collection
End Type

Public ChassisC As Collection
Public ModC As Collection
Public BookC As Collection
Public UnusedBookC As Collection

Global v As VehicleT
Global Const ErrorColour = &HC0C0FF
Global Const NormalColour = &H80000005

Global ShopDir As String
Global Const ShopDataFile = "Shop"
Global Const DATA_EXT = ".dat"
Global Const ShopTemplateFile = "Template.htm"

Global Const COMMENT_ROW = "#"
Global Const BOOK_ROW = "B"
Global Const UNUSED_BOOK_ROW = "b"
Global Const CHASSIS_ROW = "C"
Global Const ENGINE_ROW = "E"
Global Const MOD_ROW = "M"

' for backwards compatibility, discouraged
Global Const BOOK_TYPE = "0"
Global Const CHASSIS_TYPE = "1"
Global Const ENGINE_TYPE = "2"
Global Const MOD_TYPE = "3"

Public Sub ReloadData(BaseFile As String)
    ' clear the collections
    BookC.Clear
    UnusedBookC.Clear
    ChassisC.Clear
    ModC.Clear
    
    ' reload the data
    LoadFile BaseFile
End Sub

Public Sub LoadData(BaseFile As String)
Dim bcol As New Collection
Dim ubcol As New Collection
Dim ccol As New Collection
Dim mcol As New Collection
Dim ecol As Collection

    ' initialize the Collections
    Set BookC = bcol
    Set UnusedBookC = ubcol
    Set ChassisC = ccol
    Set ModC = mcol
    
    LoadFile BaseFile
End Sub

Public Sub LoadFile(File As String)
Dim c As ChassisClass
Dim e As EngineClass
Dim m As ModClass
Dim ct As ChassisT
Dim et As EngineT
Dim mt As ModT
Dim DataFile
Dim rowtype
Dim NewFile As String

    ' keep track of our books
    On Error Resume Next
    If File = "Shop" Then
        BookC.Add "All", "All"
    Else
        BookC.Add File, File
    End If
    
    On Error GoTo LoadDataError
    DataFile = FreeFile
    Open ShopDir & "\" & File & DATA_EXT For Input As DataFile
    While Not EOF(DataFile)
        rowtype = Input(1, #DataFile)
        ' if the rowtype is "\r" or "\n", ignore it
        If rowtype = Chr$(13) Or rowtype = Chr$(10) Then
        ' if rowtype is #, eat the line
        ElseIf rowtype = COMMENT_ROW Then
            While rowtype <> Chr$(10) And Not EOF(DataFile)
                rowtype = Input(1, #DataFile)
            Wend
        Else
            ' eat the comma that must follow it
            x = Input(1, #DataFile)
            If rowtype = BOOK_ROW Or rowtype = BOOK_TYPE Then
                ' load another book file
                Input #DataFile, NewFile
                LoadFile NewFile
            ElseIf rowtype = UNUSED_BOOK_ROW Then
                ' load another book file
                Input #DataFile, NewFile
                UnusedBookC.Add NewFile, NewFile
            ElseIf rowtype = CHASSIS_ROW Or rowtype = CHASSIS_TYPE Then
                Set ecol = New Collection
                Set c = New ChassisClass
                Set c.EngineC = ecol
                
                Input #DataFile, _
                    ct.ChassisType, _
                    ct.ChassisName, _
                    ct.Handling, ct.OffRoad, _
                    ct.Body, ct.Armour, _
                    ct.CF, ct.CFMax, _
                    ct.Autonav, ct.Pilot, ct.Sensor, _
                    ct.Seating, ct.Entry, _
                    ct.SetupTime, ct.TOL, ct.Other, _
                    ct.Cost
                
                c.ChassisType = ct.ChassisType
                c.ChassisName = ct.ChassisName
                c.Handling = ct.Handling
                c.OffRoad = ct.OffRoad
                c.Body = ct.Body
                c.Armour = ct.Armour
                c.CF = ct.CF
                c.CFMax = ct.CFMax
                c.Autonav = ct.Autonav
                c.Pilot = ct.Pilot
                c.Sensor = ct.Sensor
                c.Seating = ct.Seating
                c.Entry = ct.Entry
                c.SetupTime = ct.SetupTime
                c.TOL = ct.TOL
                c.Other = ct.Other
                c.Cost = ct.Cost
                
                c.Book = File
            
                ChassisC.Add c, c.ChassisName
            ElseIf rowtype = ENGINE_ROW Or rowtype = ENGINE_TYPE Then
                Set e = New EngineClass
                Input #DataFile, _
                    Chassis, _
                    et.EngineName, _
                    et.Speed, et.SpeedMax, _
                    et.Accel, et.AccelMax, _
                    et.Load, et.LoadMax, _
                    et.Sig, _
                    et.Economy, et.EconomyMax, _
                    et.Fuel, _
                    et.Cost
                    
                e.EngineName = et.EngineName
                e.Speed = et.Speed
                e.SpeedMax = et.SpeedMax
                e.Accel = et.Accel
                e.AccelMax = et.AccelMax
                e.Load = et.Load
                e.LoadMax = et.LoadMax
                e.Sig = et.Sig
                e.Economy = et.Economy
                e.EconomyMax = et.EconomyMax
                e.Fuel = et.Fuel
                e.Cost = et.Cost
                
                e.Book = File
                
                Set c = ChassisC.Item(Chassis)
                c.EngineC.Add e, e.EngineName
            ElseIf rowtype = MOD_ROW Or rowtype = MOD_TYPE Then
                Set m = New ModClass
                Input #DataFile, _
                    mt.ModType, _
                    mt.ModName, _
                    mt.Priority, _
                    mt.Markup, _
                    mt.Level, _
                    mt.Label, mt.limit, _
                    mt.expr
                    
                m.ModType = mt.ModType
                m.ModName = mt.ModName
                m.Priority = mt.Priority
                m.Markup = mt.Markup
                m.Level = mt.Level
                m.Label = mt.Label
                m.limit = mt.limit
                m.expr = mt.expr
                
                m.Book = File
                
                ModC.Add m, m.ModName
            Else
                ' if rowtype is unknown, eat the line
                While rowtype <> Chr$(10) And Not EOF(DataFile)
                    rowtype = Input(1, #DataFile)
                Wend
            End If
        End If
    Wend
ExitLoadData:
    Close #DataFile
    Exit Sub
LoadDataError:
    If Err = 13 Then
        Resume Next
    ElseIf Err = 457 Then
        ' key already exists - ignore
        Resume Next
    ElseIf Err = 53 Then
        ' file not found
        Resume ExitLoadData
    End If
    MsgBox Error
'    Resume
    GoTo ExitLoadData
End Sub

Public Function WordWrap(s As String, width As Integer)
    Dim t As String, ns As String
    Dim x As Integer, y As Integer
    x = 0
    ns = ""
    While Len(s) > 0
        y = InStr(s, " ")
        While y < width And y <> 0
            x = y
            y = InStr(x + 1, s, " ")
        Wend
        If x > 0 Then
            ns = ns & Left$(s, x) & Chr$(13)
            s = Mid$(s, x + 1)
        End If
    Wend
    WordWrap = ns
End Function
